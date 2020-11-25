import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
  devBaseUrl:string,
  liveBaseUrl:string,
  baseUrl: string,
  authToken: string,
};


const func = () => {
  const devUrl ='http://192.168.0.13:3000';
  const liveUrl = 'http://api.ebhubon.com';

  let temp = devUrl;
  // console.log("process.env.NODE_ENV",process.env.NODE_ENV);
  if (process.env.NODE_ENV == "production"){
    temp = liveUrl;
  }
  return temp;
}

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'Seller Panel',
  pwa: false,
  iconfontUrl: '',
  devBaseUrl:'http://192.168.0.13:3000',
  liveBaseUrl:'http://api.ebhubon.com',
  baseUrl: func(),
  authToken: '',
};

export type { DefaultSettings };

export default proSettings;

