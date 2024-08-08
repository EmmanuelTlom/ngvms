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
export type RequestErrors = {
  errors: GenericData
}

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

export type Dashboard = {
  everything?: Everything,
  filling_outlets: number,
  filling_outlets_inc: number,
  conversion_centers: number,
  conversion_centers_inc: number,
  certificate_centers: number
  certificate_centers_inc: number
  storage_dealerships: number,
  storage_dealerships_inc: number,
  verification_centers: number,
  verification_centers_inc: number,
  financial_service_providers: number,
  financial_service_providers_inc: number,
}

export type Notification = {
  id: string;
  title: string;
  message: string;
  important: boolean,
  readAt: string;
  createdAt: string;
};

export type EverythingData = {
  id: number;
  name: string;
  updatedAt?: string;
  createdAt?: string;
};

export type Everything = {
  filling_outlets: EverythingData[],
  conversion_centers: EverythingData[],
  certificate_centers: EverythingData[],
  storage_dealerships: EverythingData[],
  verification_centers: EverythingData[],
  financial_service_providers: EverythingData[],
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
  type?: 'dealer' | 'son' | 'naddc' | 'frsc' | 'nmdpra';
  about: string;
  email: string,
  phone: string,
  roles?: PriviRole[];
  verified: boolean;
  username: string,
  imageUrl: string;
  permissions?: PriviPerm[];
  fullname: string;
  verifying: string;
  userData: {
    ip: string,
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
export interface Vehicle {
  id: number;
  name: string;
  user?: User;
  imageUrl: string;
  identifier: string;
  fillingOutlet?: EverythingData;
  conversionCenter?: EverythingData;
  storageDealership?: EverythingData;
  certificateCenter?: EverythingData;
  verificationCenter?: EverythingData;
  financialServiceProvider?: EverythingData;
  updatedAt: string;
  createdAt: string;
}

export interface VehicleForm {
  image?: File;
  identifier: string;
  filling_outlet_id: number;
  conversion_center_id: number;
  storage_dealership_id: number;
  certificate_center_id: number;
  verification_center_id: number;
  financial_service_provider_id: number;
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
