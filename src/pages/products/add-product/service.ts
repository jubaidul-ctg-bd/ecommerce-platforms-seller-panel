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
  return rqResult;
}

export async function querySlug(params: { slug: string }) {
  console.log("params", params.slug);
  
  return request('/product/getSlug', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function categoryQuery(params?: { term: string }) {
  let rqResult = request('/term/getCategory', {
    params,
  });
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



