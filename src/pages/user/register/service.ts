import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  const hell = await request('/sellers/registration', {
    method: 'POST',
    data: params,
  });
  
  hell.status = 'ok'
  console.log("hell================", hell);
  return hell;
}
