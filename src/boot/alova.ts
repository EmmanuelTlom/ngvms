import { AlovaAxiosRequestConfig, axiosRequestAdapter } from '@alova/adapter-axios';
import { AlovaGenerics, Method, createAlova } from 'alova';
import { AxiosError, AxiosResponse, AxiosResponseHeaders } from 'axios';

import { GenericResponse } from 'repository/models';
import { RouteLocationNormalized } from 'vue-router';
import VueHook from 'alova/vue';
import { boot } from 'quasar/wrappers';
import { createClientTokenAuthentication } from 'alova/client';
import fetchAdapter from 'alova/fetch';
import { notify } from 'src/utils/helpers';
import { readEnv } from 'src/utils/proccessor';
import { useBootstrapStore } from 'src/stores/bootstrap-store';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     // $axios: ResponseMethod;
//     // $api: AxiosInstance; 906 569 8152
//   }
// }

const baseURL = readEnv('baseURL');

/* eslint-disable @typescript-eslint/no-explicit-any */
type ResponseMethod =
  Method<AlovaGenerics<any, any, fetchAdapter.FetchRequestInit, Response, Headers, any, any, any>> |
  Method<AlovaGenerics<any, any, AlovaAxiosRequestConfig, AxiosResponse<any, any>, AxiosResponseHeaders, any, any, any>>

function isAxios (useAxios: boolean, response: AxiosResponse | Response): response is AxiosResponse {
  return useAxios === true;
}

const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({
  refreshToken: {
    isExpired: () => {
      return false;
    },
    handler: async () => {
      const boot = useBootstrapStore();
      await boot.clearAuth().then(() => {
        boot.redirectTo({ name: 'auth.login' } as RouteLocationNormalized);
      });
    }
  },
  assignToken: method => {
    const boot = useBootstrapStore();
    method.config.headers.Authorization = 'Bearer ' + boot.token;
  },
  async logout () {
    await useBootstrapStore().clearAuth()
  }
});

const { onAuthRequired: onAuthRequiredAxios, onResponseRefreshToken: onResponseRefreshTokenAxios } = createClientTokenAuthentication<
  typeof VueHook,
  typeof axiosRequestAdapter
>({
  refreshToken: {
    isExpired: () => {
      return false;
    },
    handler: async () => {
      const boot = useBootstrapStore();
      await boot.clearAuth().then(() => {
        boot.redirectTo({ name: 'auth.login' } as RouteLocationNormalized);
      });
    }
  },
  assignToken: method => {
    const boot = useBootstrapStore();
    method.config.headers.Authorization = 'Bearer ' + boot.token;
  }
});

/**
 *
 */
const responded = async (
  response: AxiosResponse | Response,
  method: ResponseMethod,
  useAxios: boolean = false
) => {
  const json = isAxios(useAxios, response)
    ? await response.data
    : await response.clone().json();

  return new Promise((resolve, reject) => {
    if (typeof json.response !== 'undefined' && !json.data) {
      json.data = json.response;
      if (Array.isArray(json.data) && json.data.length === 0) {
        json.data = {};
      }
      delete json.response;
    }

    if (response.status >= 400) {
      const message = (json.message || response.statusText || 'Unknown error') as string;
      if (![422, 401, 403].includes(response.status)) {
        notify(message, json.status || 'error');
      }

      if (json.errors) {
        json.errors = Object.assign(
          {},
          ...Object.keys(json.errors).map((e) => {
            return {
              [e]: Array.isArray(json.errors[e])
                ? json.errors[e][0]
                : json.errors[e],
            };
          }),
        );
      }
      reject(json);
    }
  });
};

// 1. Create an alova instance
const alova = createAlova({
  baseURL,
  responded: onResponseRefreshToken(responded),
  statesHook: VueHook,
  requestAdapter: fetchAdapter()
});

// 2. Create an alova instance for axios
const axios = createAlova({
  baseURL,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
  responded: onResponseRefreshTokenAxios({
    onSuccess (
      response: AxiosResponse,
      method

    ) {
      return responded(response, method, true);
    },
    /**
     *
     */
    onError (err: AxiosError) {
      const response = err.response as unknown as GenericResponse<Record<string, string | number>>;
      if (!response) {
        return;
      }

      if (response.status >= 400) {
        const message =
          response.data.message || response.statusText || 'Unknown error';
        if (![422, 401, 403].includes(response.status)) {
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
  }),
});

export default boot(async ({ app, router }) => {
  const boot = useBootstrapStore();

  const beforeRequest = (method: ResponseMethod, withCredentials?: boolean) => {
    // Set headers
    method.config.headers['Access-Control-Allow-Credentials'] = 'true'
    method.config.headers['X-Requested-With'] = 'XMLHttpRequest'
    method.config.headers['Accept'] = 'application/json'

    if (withCredentials) {
      method.config.headers.withCredentials = 'true'
    }

    if (
      !method.meta?.noContentType &&
      method.config.headers['Content-Type'] !== 'multipart/form-data'
    ) {
      method.config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
  }

  alova.options.beforeRequest = onAuthRequired((method) => beforeRequest(method))
  axios.options.beforeRequest = onAuthRequiredAxios((method) => beforeRequest(method, true))
  app.config.globalProperties.$alova = alova;

  router.beforeResolve(async (to) => {
    if (
      boot.redirect &&
      to.name !== boot.redirect.name
    ) {
      router.replace(boot.redirect);
      boot.redirect = null;
    }
  });
});

export { alova, axios };
