import {
  Dashboard,
  GenericData,
  Notification,
  ResponseBody,
  User,
} from 'app/repository/models';
import { alova, axios } from 'src/boot/alova';

export const logoutRequest = () => {
  const method = alova.Post<ResponseBody>('/v1/account/logout');
  method.meta = {
    authRole: 'logout',
  };
  return method;
};

export const loginRequest = (form: {
  email: string;
  password: string;
  remember: boolean;
}) => {
  const method = alova.Post<ResponseBody<User> & { token: string }>(
    '/v1/auth/login',
    form,
    {
      params: {
        with: 'permissions',
      },
    },
  );
  method.meta = {
    authRole: 'login',
  };
  return method;
};

export const forgotPasswordRequest = (form: { email: string }) => {
  return alova.Post<ResponseBody<User> & { try_at: string }>(
    '/v1/auth/forgot-password',
    form,
  );
};

export const resetPasswordRequest = (
  form: {
    code: string;
    password?: 'string';
    password_confirmation?: 'string';
  },
  check: boolean = false,
) => {
  return alova.Post<ResponseBody<User> & { try_at: string }>(
    `/v1/auth/reset-password${check ? '/check-code' : ''}`,
    form,
  );
};

export const verificationRequest = (
  form: {
    code: string;
    _method?: 'POST' | 'PUT';
  },
  type: 'email' | 'phone',
) => {
  const method = alova.Post<
    ResponseBody<User> & { reboot: boolean; try_at: string }
  >(`/v1/verify/with-code/${type}`, form);
  return method;
};

export const registerRequest = (form: {
  name: string;
  email: string;
  phone: string;
  accept: boolean;
  password: string;
  password_confirmation: string;
  name_of_conversion_center: '';
  cac_number: '';
  contact_number: '';
  full_address: '';
  state: '';
  lga: '';
  tin: '';
  cac_certificate: null;
  naddc_certificate: null;
}) => {
  const method = alova.Post<
    ResponseBody<User> & { token: string; try_at: string }
  >('/v1/auth/register', form);
  method.meta = {
    authRole: 'login',
  };
  return method;
};

export const profileRequest = (
  form: User & { image: File; _method?: 'POST' | 'PUT' },
  indentifier: string,
) => {
  form._method ??= 'PUT';

  const method = axios.Post<ResponseBody<User>>(
    `/v1/account/${indentifier}`,
    form,
    {
      name: 'updateProfile',
    },
  );

  method.config.headers['Content-Type'] = 'multipart/form-data';

  return method;
};

export const dashboardRequest = (params?: GenericData) => {
  return alova.Get<ResponseBody<Dashboard>>('/v1/account/dashboard', {
    params,
  });
};

type NotifResponseBody<T> = ResponseBody<T> & {
  stats: {
    read: number;
    unread: number;
    important: number;
  };
  important: Notification[];
};

export const notificationsRequest = (params?: GenericData) => {
  type NX = Array<Notification>;
  return alova.Get<NotifResponseBody<Notification[]> & NX>(
    '/v1/account/notifications',
    {
      params,
      cacheFor: 5 * 60,
    },
  );
};
