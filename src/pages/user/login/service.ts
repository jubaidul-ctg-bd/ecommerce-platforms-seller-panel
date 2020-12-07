import request from 'umi-request';
// import  proSettings  from '../../../../config/defaultSettings';

export interface LoginParamsType {
  id: number;
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) { 

}

export async function AccountLogin(params: LoginParamsType) {
  const auth = await request('/user/login', {
    method: 'POST',
    data: {
      ...params,
      userAgent: 'seller', 
    },
  });
  console.log("auth======", auth);
  if(auth.status==="ok")
  {
    localStorage.setItem("access_token", auth.access_token)
    localStorage.setItem("antd-pro-authority", "admin")

    // proSettings.authToken = auth.access_token;
    return {
    status: 'ok',
    currentAuthority: 'admin',
    };
  }
  else return auth;
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
