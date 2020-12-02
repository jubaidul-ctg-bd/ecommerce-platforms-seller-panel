import request from 'umi-request';
import { history } from 'umi';
import province from './geographic/province.json';



export async function queryCurrent(): Promise<any> {
  // // console.log("Hello LocalStorage=======",localStorage.getItem('access_token'));
  // let value = await request('/users/currentUser');
  // console.log("value=============", value);
  // value.name = value.mail;
  // value.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
  // return value;

  // console.log("Hello LocalStorage=======",localStorage.getItem('access_token'));
  let sellerInfo = await request('/seller/currentSeller');
  console.log("value=============", sellerInfo);
  if(sellerInfo && sellerInfo.hasOwnProperty("shopTitle") && sellerInfo.shopTitle)
  {
    localStorage.setItem('shopTitle', sellerInfo.shopTitle)
    sellerInfo.name = sellerInfo.shopTitle;
    sellerInfo.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    return sellerInfo;
  }
  else 
  {
    history.replace({
      pathname: '/user/login-result',
      query: {
        msg: sellerInfo
      }
    });
  }
 
}

export async function queryProvince() {
  return function getProvince(_: Request, res: Response) {
    return res.json(province);
  }
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
