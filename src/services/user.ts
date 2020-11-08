import request from '@/utils/request';
// import proSettings from '../../config/defaultSettings';

export async function query(): Promise<any> {
  return request('/api/users');
}


export async function queryCurrent(): Promise<any> {
  return request('/sellers/decode/'+localStorage.getItem("access_token"));
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}








