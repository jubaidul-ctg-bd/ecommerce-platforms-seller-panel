import {RequestConfig} from 'umi';
import { RequestOptionsInit } from 'umi-request';

const baseURLInterceptor = (url: null | string, options: RequestOptionsInit) => {
    return {
      url: `http://localhost:3005/${url}`,
      options: { ...options, interceptors: true}
    }
  }
  
  const errorHandler=()=>console.log('something went wrong');
  
  export const request: RequestConfig = {
    requestInterceptors: [ baseURLInterceptor ],
    errorHandler,
  };
  