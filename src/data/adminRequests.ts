import { Certificate, CertificateForm, ConversionCenter, ConversionCenterForm, ConversionKit, ConversionKitForm, Dashboard, FillingOutlet, FillingOutletForm, GenericData, ResponseBody, User, UserForm, Vehicle, VehicleForm } from 'app/repository/models';
import { Configuration, ConfigurationGroup } from 'app/repository/configs';
import { alova, axios } from 'src/boot/alova';

export const dashboardRequest = (
  params?: GenericData
) => {
  return alova.Get<ResponseBody<Dashboard>>('/v1/admin/dashboard', {
    params
  });
};

/**
 * Add new vehicle data
 *
 * @param form
 * @param id
 * @returns
 */
export const vehicleCreateRequest = (
  form: VehicleForm & { _method?: 'POST' | 'PUT' },
  id?: string | string[],
) => {

  const fm = {
    image: form.image,
    type: form.type,
    make: form.make,
    color: form.color,
    status: form.status,
    weight: form.weight,
    chasis_number: form.chasis_number,
    insurance_policy: form.insurance_policy,
    registration_number: form.registration_number,
    inspection_officer_name: form.inspection_officer_name,
    _method: id ? 'PUT' : 'POST'
  }

  const method = axios.Post<ResponseBody<Vehicle>>(`/v1/admin/vehicles${id ? '/' + id : ''}`, fm, {
    name: 'updateVehicle',
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

/**
 * Fetch a vehicle by the given ID
 *
 * @param id
 * @returns
 */
export const vehicleRequest = (
  id?: string | string[],
  params?: GenericData
) => {
  return alova.Get(`/v1/admin/vehicles/${id}`, {
    params,
    name: 'getVehicle',
    transform: (e: ResponseBody<Vehicle>) => e.data
  });
};

/**
 * Fetch all vehicles matching provided params
 *
 * @param params
 * @returns
 */
export const vehiclesRequest = (
  params?: GenericData
) => {
  return alova.Get<ResponseBody<Vehicle[]>>('/v1/admin/vehicles', {
    params,
    name: 'getVehicles',
  });
};


/**
 * Add new filling outlet data
 *
 * @param form
 * @param id
 * @returns
 */
export const fillingOutletCreateRequest = (
  form: FillingOutletForm & { _method?: 'POST' | 'PUT' },
  id?: string | string[],
) => {

  const fm = {
    image: form.image,
    lga: form.lga,
    email: form.email,
    phone: form.phone,
    state: form.state,
    status: form.status,
    address: form.address,
    license_number: form.license_number,
    inspection_officers: form.inspection_officers,
    _method: id ? 'PUT' : 'POST'
  }

  const method = axios.Post<ResponseBody<FillingOutlet>>(`/v1/admin/filling-outlets${id ? '/' + id : ''}`, fm, {
    name: 'updateFillingOutlet',
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

/**
 * Fetch a filling outlet by the given ID
 *
 * @param id
 * @returns
 */
export const fillingOutletRequest = (
  id?: string | string[],
  params?: GenericData
) => {
  return alova.Get(`/v1/admin/filling-outlets/${id}`, {
    params,
    name: 'getFillingOutlet',
    transform: (e: ResponseBody<FillingOutlet>) => e.data
  });
};

/**
 * Fetch all filling outlet matching provided params
 *
 * @param params
 * @returns
 */
export const fillingOutletsRequest = (
  params?: GenericData
) => {
  return alova.Get<ResponseBody<FillingOutlet[]>>('/v1/admin/filling-outlets', {
    params,
    name: 'getFillingOutlet',
  });
};


/**
 * Add new certificates data
 *
 * @param form
 * @param id
 * @returns
 */
export const certificateCreateRequest = (
  form: CertificateForm & { _method?: 'POST' | 'PUT' },
  id?: string | string[],
) => {

  const fm = {
    image: form.image,
    status: form.status,
    importer: form.importer,
    dealer_id: form.dealer_id,
    manufacturer: form.manufacturer,
    kit_serial_number: form.kit_serial_number,
    inspection_officers: form.inspection_officers,
    _method: id ? 'PUT' : 'POST',
  }

  const method = axios.Post<ResponseBody<Certificate>>(`/v1/admin/certificates${id ? '/' + id : ''}`, fm, {
    name: 'updateCertificate',
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

/**
 * Fetch a certificates by the given ID
 *
 * @param id
 * @returns
 */
export const certificateRequest = (
  id?: string | string[],
  params?: GenericData
) => {
  return alova.Get(`/v1/admin/certificates/${id}`, {
    params,
    name: 'getCertificate',
    transform: (e: ResponseBody<Certificate>) => e.data
  });
};

/**
 * Fetch all certificates matching provided params
 *
 * @param params
 * @returns
 */
export const certificatesRequest = (
  params?: GenericData
) => {
  return alova.Get<ResponseBody<Certificate[]>>('/v1/admin/certificates', {
    params,
    name: 'getCertificate',
  });
};

/**
 * Add new Conversion Center data
 *
 * @param form
 * @param id
 * @returns
 */
export const conversionCenterCreateRequest = (
  form: ConversionCenterForm & { _method?: 'POST' | 'PUT' },
  id?: string | string[],
) => {

  const fm = {
    image: form.image,
    name: form.name,
    email: form.email,
    phone: form.phone,
    status: form.status,
    address: form.address,
    officer: form.officer,
    license_number: form.license_number,
    _method: id ? 'PUT' : 'POST'
  }

  const method = axios.Post<ResponseBody<ConversionCenter>>(`/v1/admin/conversion-centers${id ? '/' + id : ''}`, fm, {
    name: 'updateConversionCenter',
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

/**
 * Fetch a Conversion Center by the given ID
 *
 * @param id
 * @returns
 */
export const conversionCenterRequest = (
  id?: string | string[],
  params?: GenericData
) => {
  return alova.Get(`/v1/admin/conversion-centers/${id}`, {
    params,
    name: 'getConversionCenter',
    transform: (e: ResponseBody<ConversionCenter>) => e.data
  });
};

/**
 * Fetch all Conversion Centers matching provided params
 *
 * @param params
 * @returns
 */
export const conversionCentersRequest = (
  params?: GenericData,
  guest?: boolean
) => {
  const url = !guest ? '/v1/admin/conversion-centers' : '/v1/conversion-centers'
  return alova.Get<ResponseBody<ConversionCenter[]>>(url, {
    params,
    name: 'getConversionCenter',
  });
};

/**
 * Add new Conversion Kit data
 *
 * @param form
 * @param id
 * @returns
 */
export const conversionKitCreateRequest = (
  form: ConversionKitForm & { _method?: 'POST' | 'PUT' },
  id?: string | string[],
) => {

  const fm = {
    image: form.image,
    name: form.name,
    status: form.status,
    importer: form.importer,
    description: form.description,
    manufacturer: form.manufacturer,
    serial_number: form.serial_number,
    supplied_centers_ids: form.supplied_centers_ids?.map(e => typeof e === 'number' ? e : e.id),
    _method: id ? 'PUT' : 'POST'
  }

  const method = axios.Post<ResponseBody<ConversionKit>>(`/v1/admin/conversion-kits${id ? '/' + id : ''}`, fm, {
    name: 'updateConversionKit',
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

/**
 * Fetch a Conversion Kit by the given ID
 *
 * @param id
 * @returns
 */
export const conversionKitRequest = (
  id?: string | string[],
  params?: GenericData
) => {
  return alova.Get(`/v1/admin/conversion-kits/${id}`, {
    params,
    name: 'getConversionKit',
    transform: (e: ResponseBody<ConversionKit>) => e.data
  });
};

/**
 * Fetch all Conversion Kits matching provided params
 *
 * @param params
 * @returns
 */
export const conversionKitsRequest = (
  params?: GenericData
) => {
  return alova.Get<ResponseBody<ConversionKit[]>>('/v1/admin/conversion-kits', {
    params,
    name: 'getConversionKit',
  });
};

/**
 * Add new Conversion Kit data
 *
 * @param form
 * @param id
 * @returns
 */
export const userCreateRequest = (
  form: UserForm & { _method?: 'POST' | 'PUT' },
  id?: string | string[],
) => {

  const fm = {
    image: form.image,
    name: form.name,
    type: form.type,
    about: form.about,
    email: form.email,
    phone: form.phone,
    roles: form.roles,
    verified: form.verified ? 1 : 0,
    username: form.username,
    permissions: form.permissions,
    lastname: form.lastname,
    firstname: form.firstname,
    data: form.data,
    _method: id ? 'PUT' : 'POST'
  }

  const method = axios.Post<ResponseBody<User>>(`/v1/admin/users${id ? '/' + id : ''}`, fm, {
    name: 'updateUser',
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

/**
 * Fetch a User by the given ID
 *
 * @param id
 * @returns
 */
export const userRequest = (
  id?: string | string[],
  params?: GenericData
) => {
  return alova.Get(`/v1/admin/users/${id}`, {
    params,
    name: 'getUser',
    transform: (e: ResponseBody<User>) => e.data
  });
};

/**
 * Fetch all Users matching provided params
 *
 * @param params
 * @returns
 */
export const usersRequest = (
  params?: GenericData
) => {
  return alova.Get<ResponseBody<User[]>>('/v1/admin/users', {
    params,
    name: 'getUser',
  });
};


/**
 * Save configuration
 *
 * @param form
 * @returns
 */
export const configSaveRequest = (
  form: Configuration & { _method?: 'POST' | 'PUT' },
) => {

  const method = axios.Post<ResponseBody<ConfigurationGroup> & { config: Configuration }>(`/v1/admin/configurations`, form, {
    name: 'updateConfiguration',
    params: {
      group: 1
    }
  });

  method.config.headers['Content-Type'] = 'multipart/form-data'

  return method
};

/**
 * Fetch all Configuration
 *
 * @returns
 */
export const configRequest = () => {
  return alova.Get('/v1/admin/configurations', {
    name: 'getUser',
    transform: (e: ResponseBody<ConfigurationGroup>) => e.data,
    params: {
      group: 1
    },
  });
};
