import { ResponseBody, User } from 'app/repository/models';

import { alova } from 'src/boot/alova';

export const logout = () => {
  const method = alova.Post<ResponseBody>('/v1/account/logout');
  method.meta = {
    authRole: 'logout'
  };
  return method;
};

export const login = (
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

export const register = () => {
  const method = alova.Post<ResponseBody<User> & { token: string }>('/v1/auth/register');
  method.meta = {
    authRole: 'login'
  };
  return method;
};
