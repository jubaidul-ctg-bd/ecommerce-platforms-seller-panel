import request from 'umi-request';
import { history } from 'umi';

// import request from '@/utils/request';

// import proSettings from '../../config/defaultSettings';

export async function query(): Promise<any> {
  return request('/api/users');
}


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

export async function queryCurrentSeller(): Promise<any> {
  // console.log("Hello LocalStorage=======",localStorage.getItem('access_token'));
  let value = await request('/seller/currentSeller');
  console.log("value=============", value);
  value.name = value.mail;
  value.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
  return value;
  
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}








