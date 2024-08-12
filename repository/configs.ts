
export type ConfigGroup = 'access' | 'main' | 'misc';

export interface Configuration {
  app_name: string;
  app_email: string;
  app_currency: string;
  allow_default_images: boolean;
  prefered_sms_channel: string;
  prefered_notification_channels: 'mail' | 'sms'[];
  verify_email: boolean;
  verify_phone: boolean;
  token_lifespan: number;
  paystack_public_key: string;
  payment_verify_url: string;
  reference_prefix: string;
  previews_on_save: boolean;
}

export interface ConfigurationRaw {
  id: number;
  key: keyof Configuration;
  max: number | null;
  col: number | null;
  type: 'number' | 'file' | 'url' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'search' | 'tel' | 'boolean';
  hint: string;
  title: string;
  value: string;
  count: number | null;
  group: ConfigGroup;
  secret: boolean;
  choices: (string | number)[];
  autogrow: boolean;
  multiple: boolean;
}


export type ConfigurationGroup = Record<ConfigGroup, ConfigurationRaw[]>

export const adminRoles = [
  'admin',
  'manager',
  'support',
  'super-admin',
]

export const adminPermissions = [
  'manage-users',
  'manage-admins',
  'manage-data',
  'manage-users',
  'manage-tracking',
  'manage-alerts',
  'manage-helpdesk',
  'manage-configuration',
]
