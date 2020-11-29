import request from 'umi-request';
// import axios from 'axios'

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  userId: number
  status: string
}

export  async function fakeAccountLogin(params: LoginParamsType) {
  // console.log('loginParams..................',params);
  
  const res = await request('/seller/login', {
    method: 'POST',
    data: params,
  });
  
  // if (params.type = 'account') {
  if (res.access_token) {
      localStorage.setItem('access_token',res.access_token)
      return ({
        status: 'ok'
      })
    }
  // }
  // console.log('ressscodeeeeeeeee..........', res);
  return res
}


// export  async function fakeAccountLogin(params: LoginParamsType) {
//   console.log('loginParams..................',params);
  
//   axios.post('http://192.168.0.16:3000/user/login', params)
//     .then(res => {
//       console.log('res...................',res);
      
//       // if (res.data.access_token) {
//       //   return ({
//       //     status: 'ok'
//       //   })
//       // }
      
//     }).catch((err) => {
//     console.log('error===',err.message);
    
//   })
  
//   // if (params.type = 'account') {
    
//   // }
  
// }

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
//loginNumEmail