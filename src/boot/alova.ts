import {
  AlovaAxiosRequestConfig,
  axiosRequestAdapter,
} from '@alova/adapter-axios';
import { AlovaGenerics, Method, createAlova } from 'alova';
import { AxiosError, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { GenericResponse, ResponseBody, User } from 'repository/models';
import VueHook, { VueHookType } from 'alova/vue';

import { MutationType } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { boot } from 'quasar/wrappers';
import { createClientTokenAuthentication } from 'alova/client';
// import fetchAdapter from 'alova/fetch';
import fetchAdapter, { FetchRequestInit } from 'alova/fetch';

import { notify } from 'src/utils/helpers';
import { readEnv } from 'src/utils/helpers';
import { useBootstrapStore } from 'src/stores/bootstrap-store';
import { useGlobalStore } from 'src/stores/global-store';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     // $axios: ResponseMethod;
//     // $api: AxiosInstance; 906 569 8152
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
// type ResponseMethod =
//   Method<AlovaGenerics<any, any, fetchAdapter.FetchRequestInit, Response, Headers, any, any, any>> |
//   Method<AlovaGenerics<any, any, AlovaAxiosRequestConfig, AxiosResponse<any, any>, AxiosResponseHeaders, any, any, any>>

type ResponseMethod =
  | Method<
      AlovaGenerics<
        any,
        any,
        FetchRequestInit,
        Response,
        Headers,
        any,
        any,
        any
      >
    >
  | Method<
      AlovaGenerics<
        any,
        any,
        AlovaAxiosRequestConfig,
        AxiosResponse<any, any>,
        AxiosResponseHeaders,
        any,
        any,
        any
      >
    >;

function isAxios(
  useAxios: boolean,
  response: AxiosResponse | Response,
): response is AxiosResponse {
  return useAxios === true;
}

const clearAuth = async () => {
  const boot = useBootstrapStore();
  await boot.clearAuth().then(() => {
    boot.redirectTo({ name: 'login' } as RouteLocationNormalized);
  });
};

const { onAuthRequired, onResponseRefreshToken } =
  createClientTokenAuthentication<VueHookType>({
    refreshToken: {
      isExpired: () => {
        return false;
      },
      handler: clearAuth,
    },
    assignToken: (method) => {
      const boot = useBootstrapStore();
      method.config.headers.Authorization = 'Bearer ' + boot.token;
    },
    login(response, method) {
      method.promise?.then((data: ResponseBody<User>) => {
        const boot = useBootstrapStore();
        boot.saveAuthUser(data.data, data.token);
      });
    },
    async logout() {
      await useBootstrapStore().clearAuth();
    },
  });

const {
  onAuthRequired: onAuthRequiredAxios,
  onResponseRefreshToken: onResponseRefreshTokenAxios,
} = createClientTokenAuthentication<typeof VueHook, typeof axiosRequestAdapter>(
  {
    refreshToken: {
      isExpired: () => {
        return false;
      },
      handler: clearAuth,
    },
    assignToken: (method) => {
      const boot = useBootstrapStore();
      method.config.headers.Authorization = 'Bearer ' + boot.token;
    },
  },
);

/**
 *
 */
const responded = async (
  response: AxiosResponse | Response,
  method: ResponseMethod,
  useAxios: boolean = false,
) => {
  const json = (isAxios(useAxios, response)
    ? await response.data
    : await response.clone().json()) as unknown as ResponseBody;

  return new Promise((resolve, reject) => {
    if (response.status >= 400) {
      const message = (json.message ||
        response.statusText ||
        'Unknown error') as string;
      if (response.status === 401) {
        clearAuth();
      } else if (response.status === 403) {
        useGlobalStore().setError({ code: 403, message });
      } else {
        notify(message, json.status || 'error');
      }

      if (json.errors) {
        json.errors = Object.assign(
          {},
          ...Object.keys(json.errors).map((e) => {
            return {
              [e]: Array.isArray(json?.errors?.[e])
                ? json.errors[e][0]
                : json.errors?.[e],
            };
          }),
        );
      }
      reject(json);
    } else {
      resolve(json);
    }
  });
};

const beforeRequest = (method: ResponseMethod, withCredentials?: boolean) => {
  // Set headers
  method.config.headers['Access-Control-Allow-Credentials'] = 'true';
  method.config.headers['X-Requested-With'] = 'XMLHttpRequest';
  method.config.headers['Accept'] = 'application/json';

  if (withCredentials) {
    method.config.headers.withCredentials = 'true';
  }

  const noContentType =
    !method.meta?.noContentType &&
    method.config.headers['Content-Type'] !== 'multipart/form-data';
  if (noContentType) {
    method.config.headers['Content-Type'] = 'application/json; charset=utf-8';
  }
};

// 1. Create an alova instance
const alova = createAlova({
  baseURL: readEnv('baseURL'),
  responded: onResponseRefreshToken(responded) as any,
  statesHook: VueHook,
  beforeRequest: onAuthRequired((method) => beforeRequest(method)),
  requestAdapter: fetchAdapter(),
});

// 2. Create an alova instance for axios
const axios = createAlova({
  baseURL: readEnv('baseURL'),
  statesHook: VueHook,
  beforeRequest: onAuthRequiredAxios((method) => beforeRequest(method, true)),
  requestAdapter: axiosRequestAdapter(),
  responded: onResponseRefreshTokenAxios({
    onSuccess(response: AxiosResponse, method) {
      return responded(response, method, true);
    },
    /**
     *
     */
    onError(err: AxiosError) {
      const response = err.response as unknown as GenericResponse<
        Record<string, string | number>
      >;
      if (!response) {
        return;
      }

      if (response.status >= 400) {
        const message =
          response.data.message || response.statusText || 'Unknown error';
        if (response.status === 401) {
          clearAuth();
        } else if (response.status === 403) {
          useGlobalStore().setError({ code: 403, message });
        } else {
          notify(message, response.data.status || 'error');
        }
      }
      if (response.data?.errors) {
        response.data.errors = Object.assign(
          {},
          ...Object.keys(response.data.errors).map((e) => {
            return {
              [e]: Array.isArray(response.data.errors?.[e])
                ? response.data.errors[e][0]
                : response.data.errors?.[e],
            };
          }),
        );
      }

      return new Promise((resolve, reject) => {
        reject(response.data);
      });
    },
  }) as any,
});

export default boot(async ({ app, router }) => {
  const boot = useBootstrapStore();

  app.config.globalProperties.$alova = alova;
  app.config.globalProperties.$user = boot.user;

  const redirector = (
    redirect: RouteLocationNormalized | null,
    cur: RouteLocationNormalized,
  ) => {
    if (redirect && cur.name !== redirect.name) {
      router.replace(redirect);
      boot.redirect = null;
    }
  };

  router.beforeResolve(async (to) => {
    boot.$subscribe((e, i) => {
      if (e.type === MutationType.patchFunction && i.redirect) {
        redirector(i.redirect, to);
      }
    });
    redirector(boot.redirect, to);
  });
});

export { alova, axios };
