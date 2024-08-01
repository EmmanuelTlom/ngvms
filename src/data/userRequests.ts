import { Dashboard, GenericData, Notification, ResponseBody, User } from 'app/repository/models';
import { alova, axios } from 'src/boot/alova';

export const logoutRequest = () => {
  const method = alova.Post<ResponseBody>('/v1/account/logout');
  method.meta = {
    authRole: 'logout'
  };
  return method;
};

export const loginRequest = (
  form: {
    email: string,
    password: string,
    remember: boolean
  }) => {
  const method = alova.Post<ResponseBody<User> & { token: string }>('/v1/auth/login', form);
  method.meta = {
    authRole: 'login'
  };
  return method;
};

export const registerRequest = (
  form: {
    name: string,
    email: string,
    phone: string,
    accept: boolean
    password: string,
    password_confirmation: string,
  }) => {
  const method = alova.Post<ResponseBody<User> & { token: string }>('/v1/auth/register', form);
  method.meta = {
    authRole: 'login'
  };
  return method;
};

export const profileRequest = (
  form: User & { image: File, _method?: 'POST' | 'PUT' },
  indentifier: string
) => {
  form._method ??= 'PUT'

  const method = axios.Post<ResponseBody<User>>(`/v1/account/${indentifier}`, form, {
    name: 'updateProfile',
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

export const dashboardRequest = (
  params?: GenericData
) => {
  return alova.Get<ResponseBody<Dashboard>>('/v1/account/dashboard', {
    params
  });
};

type NotifResponseBody<T> = ResponseBody<T> & {
  stats: {
    read: number,
    unread: number,
    important: number
  },
  important: Notification[]
}

export const notificationsRequest = (
  params?: GenericData,
) => {
  return alova.Get<NotifResponseBody<Notification>>('/v1/account/notifications', {
    params,
    cacheFor: 5 * 60
  });
};
