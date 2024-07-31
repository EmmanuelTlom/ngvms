import { GenericData, ResponseBody, Vehicle, VehicleForm } from 'app/repository/models';

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
