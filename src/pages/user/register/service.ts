import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  const hell = await request('/seller/registration', {
    method: 'POST',
    data: params,
  });
  
  if(hell.status=="pending") {
    hell.status = 'ok'
  }
  return hell;
}
