import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/currentUser');
  // return {name: "Seller Admin"}
}

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}
