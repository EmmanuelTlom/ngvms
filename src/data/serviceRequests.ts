import { Certificate, CertificateForm, ConversionCenter, ConversionCenterForm, ConversionKit, ConversionKitForm, FillingOutlet, FillingOutletForm, GenericData, ResponseBody, Vehicle, VehicleForm } from 'app/repository/models';

import { axios } from 'src/boot/alova';

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
  form._method = id ? 'PUT' : 'POST'

  const method = axios.Post<ResponseBody<Vehicle>>(`/v1/user/vehicles${id ? '/' + id : ''}`, form, {
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
  return axios.Get(`/v1/user/vehicles/${id}`, {
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
  return axios.Get<ResponseBody<Vehicle[]>>('/v1/user/vehicles', {
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
  form._method = id ? 'PUT' : 'POST'

  const method = axios.Post<ResponseBody<FillingOutlet>>(`/v1/user/filling-outlets${id ? '/' + id : ''}`, form, {
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
  return axios.Get(`/v1/user/filling-outlets/${id}`, {
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
  return axios.Get<ResponseBody<FillingOutlet[]>>('/v1/user/filling-outlets', {
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
  form._method = id ? 'PUT' : 'POST'

  const method = axios.Post<ResponseBody<Certificate>>(`/v1/user/certificates${id ? '/' + id : ''}`, form, {
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
  return axios.Get(`/v1/user/certificates/${id}`, {
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
  return axios.Get<ResponseBody<Certificate[]>>('/v1/user/certificates', {
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
  form._method = id ? 'PUT' : 'POST'

  const method = axios.Post<ResponseBody<ConversionCenter>>(`/v1/user/conversion-centers${id ? '/' + id : ''}`, form, {
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
  return axios.Get(`/v1/user/conversion-centers/${id}`, {
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
  const url = !guest ? '/v1/user/conversion-centers' : '/v1/conversion-centers'
  return axios.Get<ResponseBody<ConversionCenter[]>>(url, {
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
  form._method = id ? 'PUT' : 'POST'

  const nf = Object.assign({}, form)
  if (nf.supplied_centers_ids) {
    nf.supplied_centers_ids = nf.supplied_centers_ids.map(e => typeof e === 'number' ? e : e.id)
  }

  const method = axios.Post<ResponseBody<ConversionKit>>(`/v1/user/conversion-kits${id ? '/' + id : ''}`, nf, {
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
  return axios.Get(`/v1/user/conversion-kits/${id}`, {
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
  return axios.Get<ResponseBody<ConversionKit[]>>('/v1/user/conversion-kits', {
    params,
    name: 'getConversionKit',
  });
};
