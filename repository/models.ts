import { RouteLocationRaw } from 'vue-router';

export type PriviPerm = 'manage-users' | 'manage-admins' | 'manage-configuration'
export type PriviRole = 'super-admin' | 'admin' | 'manager' | 'support' | 'user'
export type ResponseStatus = 'success' | 'error' | 'danger' | 'warning' | 'info' | 'notice' | 'alert'

export type BaseOption = {
  value: string;
  label: string;
}

export type Partial<X> = {
  [K in keyof X]?: X[K]
}

export type GenericData = Record<string, string | number | boolean | Record<string, string>>

export type GenericResponse<X> = {
  data: ResponseBody<X>,
  status: number,
  statusText: string,
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

type PageLinks = {
  first: string,
  last: string,
  next: string,
  prev: string,
}

export type PageMeta = {
  current_page: number,
  last_page: number,
  per_page: number,
  total: number,
  links: {
    active: boolean,
    label: string,
    url: string,
  }[],
  from: number,
  path: string,
  to: number,
}

export type ResponseBody<X = undefined, Y = Record<string, string>> = {
  data: X,
  meta?: PageMeta,
  links?: PageLinks,
  token?: string,
  status: ResponseStatus,
  try_at?: string,
  errors?: Y,
  message: string,
  time_left?: string,
  status_code: number,
}

export type Initialize = {
  configuration: Configuration;
};

export type Configuration = {
  app_name: string,
  app_email: string,
  app_currency: string,
  allow_default_images: boolean,
  prefered_sms_channel: string,
  prefered_notification_channels: 'mail' | 'sms'[],
  verify_email: boolean,
  verify_phone: boolean,
  token_lifespan: number,
  paystack_public_key: string,
  payment_verify_url: string,
  reference_prefix: string,
  previews_on_save: boolean,
}

export interface User {
  id: string | number;
  name: string;
  type?: 'artist' | 'user';
  about: string;
  email: string,
  phone: string,
  roles?: PriviRole[];
  verified: boolean;
  username: string,
  imageUrl: string;
  followers: number,
  following: number,
  youFollow: boolean;
  followsYou: boolean;
  reputation: number,
  permissions?: PriviPerm[];
  fullname: string;
  verifying: string;
  userData: {
    settings: {
      notifications: {
        email: boolean
      }
    }
  },
  emailVerifiedAt: string;
  phoneVerifiedAt: string;
  updatedAt: string;
  createdAt: string;
}

export type NavigationLink = {
  to?: RouteLocationRaw,
  icon: string,
  title: string,
  group?: string,
  params?: GenericData,
  separator?: boolean,
  requiresAuth?: boolean,
  button?: {
    icon: string,
    action: RouteLocationRaw | ((param: string | number | Record<string, string>) => void)
  }
};

export type Link = {
  actionTitle?: string;
  actionMsg?: string;
  disabled?: boolean;
  disable?: boolean;
  loading?: boolean;
  tooltip?: string;
  action?: 'delete';
  active?: boolean;
  target?: string;
  color?: string;
  class?: string;
  click?: (param?: Link | string | string[] | number | (() => void)) => void;
  callback?: (param?: Link | string | string[] | number | (() => void)) => void;
  label: string;
  icon?: string;
  show?: boolean;
  to?: RouteLocationRaw;
};
