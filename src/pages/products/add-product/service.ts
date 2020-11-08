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
  let rqResult = request('/category/allchild');
  console.log("rqResult=============", rqResult);
  return rqResult;
}

export async function removeRule(params: { name: string[] }) {
  //console.log("params at removeRule", params);
  return request('http://localhost:3000/cats/deleteImage', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}


