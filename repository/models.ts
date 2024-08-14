import { Configuration } from './configs';
import { RouteLocationRaw } from 'vue-router';

export type PriviPerm =
  | 'manage-admins' | 'manage-data' | 'manage-users' | 'manage-tracking'
  | 'manage-alerts' | 'manage-helpdesk' | 'manage-configuration'

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
  users: number,
  users_inc: number,
  vehicles: number,
  vehicles_inc: number,
  certificates: number,
  certificates_inc: number,
  total_conversions: number,
  total_conversions_inc: number,
  total_pending: number,
  total_pending_inc: number,
  verified_users: number,
  verified_users_inc: number,
  filling_outlets: number,
  filling_outlets_inc: number,
  conversion_centers: number,
  conversion_centers_inc: number,
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
  certificates: EverythingData[],
  filling_outlets: EverythingData[],
  conversion_centers: EverythingData[],
  storage_dealerships: EverythingData[],
  verification_centers: EverythingData[],
  financial_service_providers: EverythingData[],
};

export type UserType = 'dealer' | 'son' | 'naddc' | 'frsc' | 'nmdpra' | 'finance' | 'insurance'

export type UserData = {
  ip?: string,
  settings: {
    notifications: {
      email: boolean
    }
  }
}

export interface User {
  id: number;
  name: string;
  type?: UserType;
  about: string;
  email: string,
  phone: string,
  roles?: PriviRole[];
  verified: boolean;
  username: string,
  imageUrl: string;
  permissions?: PriviPerm[];
  fullName: string;
  lastName: string;
  firstName: string;
  verifying: string;
  userData: UserData,
  emailVerifiedAt: string;
  phoneVerifiedAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface UserForm {
  image?: File;
  name: string;
  type?: UserType;
  roles?: string[];
  about: string;
  email: string,
  phone: string,
  verified: boolean;
  username: string,
  lastname?: string;
  firstname?: string;
  permissions?: string[];
  data?: UserData,
}

export interface Person {
  id: number;
  name: string;
  email: string,
  phone: string,
  lastName: string;
  firstName: string;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
}

export type PersonForm = {
  id?: number;
  image?: File;
  name: string;
  email?: string,
  phone?: string,
  last_name?: string;
  first_name?: string;
} | {
  id?: number;
  image?: File;
  name?: string;
  email?: string,
  phone?: string,
  last_name: string;
  first_name: string;
}

export interface Certificate {
  id: number;
  user?: User;
  dealer?: User;
  status: boolean;
  imageUrl: string;
  importer: string;
  manufacturer: string;
  kitSerialNumber: string;
  inspectionOfficers: Person[];
  updatedAt: string;
  createdAt: string;
}

export interface CertificateForm {
  image?: File;
  status?: boolean | number;
  importer: string;
  dealer_id?: number;
  manufacturer: string;
  kit_serial_number: string;
  inspection_officers: PersonForm[];
}

export interface ConversionCenter {
  id: number;
  name: string;
  email: string,
  phone: string,
  status: boolean;
  address: string,
  user?: User;
  officer?: Person;
  licenseNumber: string;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
}

export interface ConversionCenterForm {
  image?: File;
  name: string;
  email: string;
  phone: string;
  status?: boolean;
  address: string;
  officer: PersonForm;
  license_number: string;
}

export interface ConversionKit {
  id: number;
  user?: User;
  name: string;
  status: boolean;
  description: string;
  manufacturer: string;
  importer?: Person;
  serialNumber: string;
  imageUrl: string;
  suppliedCenters?: ConversionCenter[];
  updatedAt: string;
  createdAt: string;
}

export interface ConversionKitForm {
  image?: File;
  name: string;
  status?: boolean;
  description: string;
  manufacturer: string;
  importer: PersonForm;
  supplied_centers_ids: number[] | ConversionCenter[];
  serial_number: string;
}

export interface Vehicle {
  id: number;
  name: string;
  user?: User;
  type: string;
  make: string;
  color: string;
  status: boolean;
  weight: string;
  imageUrl: string;
  chasisNumber: string;
  insurancePolicy: string;
  registrationNumber: string;
  inspectionOfficerName: string;
  updatedAt: string;
  createdAt: string;
}

export interface VehicleForm {
  image?: File;
  type?: string;
  make?: string;
  color?: string;
  status?: boolean | number;
  chasis_number?: string;
  weight?: string;
  insurance_policy?: string;
  registration_number?: string;
  inspection_officer_name?: string;
}

export interface FillingOutlet {
  id: number;
  user?: User;
  imageUrl: string;
  lga: string;
  email: string;
  phone: string;
  state: string;
  status?: string;
  address: string;
  licenseNumber: string;
  inspectionOfficers: Person[];
  updatedAt: string;
  createdAt: string;
}

export interface FillingOutletForm {
  image?: File;
  lga: string;
  email: string;
  phone: string;
  state: string;
  status?: string;
  address: string;
  license_number: string;
  inspection_officers: PersonForm[];
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
