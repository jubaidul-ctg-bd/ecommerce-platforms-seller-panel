import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  const hell = await request('/seller/registration', {
    method: 'POST',
    data: params,
  });
  
  hell.status = 'ok'
  console.log("hell================", hell);
  return hell;
}
