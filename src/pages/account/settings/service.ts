import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/currentUser');
  // return {name: "Seller Admin"}
}

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
