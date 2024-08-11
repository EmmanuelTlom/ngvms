import { Configuration, Initialize, PriviPerm, PriviRole, ResponseBody, User } from 'repository/models';
import { RouteLocationNormalized, Router } from 'vue-router';

import { alova } from 'src/boot/alova';
import { finder } from '@medv/finder'
import { invalidateCache } from 'alova';
import { useBootstrapStore } from 'src/stores/bootstrap-store';

export const refreshUser = (router?: Router) => {
  return new Promise<User>(async (resolve) => {
    const boot = useBootstrapStore();
    if (!boot.token) {
      return resolve({} as User);
    }

    alova
      .Get<ResponseBody<User>>('v1/account', {
        params: { with: 'permissions,earnings' },
      })
      .send()
      .then(({ data }) => {
        if (data) {
          boot.setUser(data);
          resolve(data);
        } else {
          resolve(boot.user);
        }
      })
      .catch(({ error }: { error: ResponseBody<string[]> }) => {
        if (error?.status_code === 401 && error?.status === 'error') {
          boot.saveAuthUser({} as User, null);
          if (router && router.replace) {
            return router.replace({ name: 'login' });
          }
        }
        resolve({} as User);
      });
  });
};

export const reboot = (done?: () => void, router?: Router, reloadUser: boolean | number = false) => {
  invalidateCache();

  return new Promise<{
    init: { configuration: Configuration },
    user: User,
    error?: Record<string, string>
  }>((resolve) => {
    const boot = useBootstrapStore();
    const method = alova.Get<ResponseBody<Initialize>>('v1/initialize');
    method.meta = { noContentType: true };

    method
      .send()
      .then(async ({ data }) => {
        typeof done === 'function' && done();
        boot.setReady();
        if (data) {
          boot.setConfig(data);

          let user = boot.user;

          if (reloadUser || (!boot.user.id && reloadUser !== 0)) {
            user = await refreshUser(router);
          }

          resolve({ init: data, user });
        } else {
          resolve({ init: { configuration: boot.configuration }, user: boot.user });
        }
      })
      .catch((error) => {
        resolve({ init: { configuration: boot.configuration }, user: boot.user, error });
      });
  });
};

export const authValidator = (
  { to, from }: { to: RouteLocationNormalized, from?: RouteLocationNormalized },
  router: Router,
  usr?: User,
) => {
  if (!to) {
    return false
  }

  // Initialize the bootstrap store
  const boot = useBootstrapStore();

  const user = usr ? usr : boot.user;

  // Check if user is logged in when requesting a page that requires authentication
  if (!boot.token && (to.meta.requireAuth || to.meta.requireAdmin) && to.name !== 'login') {
    // Redirect to Login if login required
    return router.replace({ name: 'login' });
  } else if (boot.token) {
    const config = boot.configuration;

    // Set variables: User needs to be verified
    const needVerify =
      (!user?.emailVerifiedAt && config?.verify_email) ||
      (!user?.phoneVerifiedAt && config?.verify_phone);

    // Set variables: User is verified
    const isVerified = !needVerify && !to.meta.requireCode;

    const pushVerification = () => {
      if (
        user?.id &&
        !to.meta.requireCode &&
        !isVerified &&
        to.name !== 'logout'
      ) {
        if (to.name == 'auth.verify')
          return true;

        const type = user.verifying || 'email';
        if (!user.emailVerifiedAt && config.verify_email) {
          return router.push({
            name: 'auth.verify',
            params: { type },
          });
        } else if (!user.phoneVerifiedAt && config.verify_phone) {
          return router.push({
            name: 'auth.verify',
            params: { type },
          });
        }
      }
      //  else if (to.name !== "home" && (isVerified || !needVerify)) {
      //   return router.replace({ name: "home" });
      // }
    };

    // Redirect to the appropriate dashboard based on user role and verification status

    if (to.meta.requireGuest) {
      if (user.roles?.length || user.permissions?.length) {
        return router.replace({ name: 'admin.dashboard' });
      }

      if (isVerified || !needVerify) {
        if (to.name == 'register' && from?.query.reference) {
          return true
        }
        return router.replace({ name: 'user.dashboard' });
      } else {
        return pushVerification();
      }
    } else {
      return pushVerification();
    }
  }
};

/**
 * Check if a user can do something in an organization
 */
export const iCan = (ability?: PriviPerm | PriviRole, user?: User) => {
  user ??= useBootstrapStore().user

  if ((!user.permissions || user.permissions.length < 1) && (!user.roles || user.roles.length < 1)) {
    return false;
  }

  if (!ability) {
    return true;
  }

  return user.permissions?.includes(ability as PriviPerm) ||
    user.roles?.includes(ability as PriviRole) ||
    false;
};


export const arrayObjectUpdater = (array: any[], data: any) => {
  const i = array.findIndex((e: any) => e.id === data.id);
  array[i] = Object.assign({}, array[i], data);
}

export const printArea = (el: HTMLElement | string) => {
  let area = typeof el === 'string' ? document.getElementById("GFG") : el

  const a = window.open('', '', 'height=500, width=500');

  const dumpCSSText = (el: HTMLElement) => {
    var s = '';
    var o = getComputedStyle(el);
    for (var i = 0; i < o.length; i++) {
      s += o[i] + ': ' + o.getPropertyValue(o[i]) + ';';
    }
    return s;
  }

  let classes = '';

  if (a && area) {
    area.querySelectorAll('*').forEach(function (node) {
      const selector = finder(node)
      classes += `${selector} {${dumpCSSText(node as HTMLElement)}}`
    });

    area = area.cloneNode(true) as HTMLElement;

    area.querySelectorAll('.print-hide, [aria-hidden=true]').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });

    a.document.write('<html>');
    a.document.write(`
      <head>
        <style>${classes}.q-table__container,.q-table__middle,.q-table,body > :first-child {width:100%!important}</style>
      </head>
    `);
    a.document.write('<body>');
    a.document.write(area.innerHTML);
    a.document.write('</body></head>');
    a.document.close();
    a.print();
  }
}
