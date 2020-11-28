import request from 'umi-request';

export async function fakeSubmitForm(params: any) {
  return request('/product/create', {
    method: 'POST',
    data: params,
  });
}

export async function queryRule() {
  //console.log("params at queryRule");
  let rqResult = request('/product/all');
  console.log("rqResult=============", rqResult);
  return rqResult;
}

export async function categoryQuery() {
  let rqResult = request('/term/allchild');
  return rqResult;
}

export async function removeRule(params: { name: string[] }) {
  //console.log("params at removeRule", params);
  return request('/product/deleteImage', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function getTermValue(params: { id: string }) {
  //console.log("params at removeRule", params);
  let value = request('/product/getTermValue', {
    method: 'POST',
    data: {
      ...params,
    },
  });  
  return value;
}



