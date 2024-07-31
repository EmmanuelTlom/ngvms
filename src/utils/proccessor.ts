import { Configuration, Initialize, PriviPerm, ResponseBody, User } from 'repository/models';
import { RouteLocationNormalized, Router } from 'vue-router';

import { alova } from 'src/boot/alova';
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
            return router.replace({ name: 'auth.login' });
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
  if (!boot.token && (to.meta.requireAuth || to.meta.requireAdmin)) {
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
        const type = user.verifying || 'email';
        if (!user.emailVerifiedAt && config.verify_email && to.name) {
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
export const iCan = (ability: PriviPerm) => {
  const user = useBootstrapStore().user

  if (!user.permissions || user.permissions.length < 1) {
    return false;
  }

  if (!ability) {
    return true;
  }

  return user.permissions.includes(ability) ?? false;
};
