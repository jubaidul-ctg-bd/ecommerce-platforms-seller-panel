import request from 'umi-request';
import proSettings from '../../../../config/defaultSettings';


export async function upload(file) {
  let formData = new FormData();
    formData.append('file', file);
    formData.append('domain', 'POST');
    formData.append('filename', file.name );

    try {
    const response = await request('/media/upload', {
      method: 'POST',
      body: formData
    });    
    return response;
  } catch (error) {
    console.log('Error fetching profile ' + error);
  }      
  // return request('/media/upload', {
  //   method: 'POST',
  //   data: {
      
  //   },
  // });
}

export async function updateRule(params: any) {
  return request('/seller/sellerUpdate', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryCurrent(){
  // // console.log("Hello LocalStorage=======",localStorage.getItem('access_token'));
  // let value = await request('/users/currentUser');
  // console.log("value=============", value);
  // value.name = value.mail;
  // value.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
  // return value;

  // console.log("Hello LocalStorage=======",localStorage.getItem('access_token'));
  
  let sellerInfo = await request('/seller/currentSeller');
  sellerInfo.userid = "00000001"
  if (sellerInfo.avatar) {
    sellerInfo.avatar = proSettings.baseUrl+"/media/image/"+sellerInfo.avatar.url;
  } else {
    sellerInfo.avatar = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
  }
  console.log("value=============", sellerInfo);
  return sellerInfo
 
}


// export async function queryCurrent() {
//   return {
//     "name": "Serati Ma",
//     "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
//     "userid": "00000001",
//     "email": "antdesign@alipay.com",
//     "signature": "海纳百川，有容乃大",
//     "title": "交互专家",
//     "group": "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
//     "tags": [
//         {
//             "key": "0",
//             "label": "很有想法的"
//         },
//         {
//             "key": "1",
//             "label": "专注设计"
//         },
//         {
//             "key": "2",
//             "label": "辣~"
//         },
//         {
//             "key": "3",
//             "label": "大长腿"
//         },
//         {
//             "key": "4",
//             "label": "川妹子"
//         },
//         {
//             "key": "5",
//             "label": "海纳百川"
//         }
//     ],
//     "notice": [
//         {
//             "id": "xxx1",
//             "title": "Alipay",
//             "logo": "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//             "description": "那是一种内在的东西，他们到达不了，也无法触及的",
//             "updatedAt": "2020-12-02T07:23:06.930Z",
//             "member": "科学搬砖组",
//             "href": "",
//             "memberLink": ""
//         },
//         {
//             "id": "xxx2",
//             "title": "Angular",
//             "logo": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
//             "description": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
//             "updatedAt": "2017-07-24T00:00:00.000Z",
//             "member": "全组都是吴彦祖",
//             "href": "",
//             "memberLink": ""
//         },
//         {
//             "id": "xxx3",
//             "title": "Ant Design",
//             "logo": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
//             "description": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
//             "updatedAt": "2020-12-02T07:23:06.930Z",
//             "member": "中二少女团",
//             "href": "",
//             "memberLink": ""
//         },
//         {
//             "id": "xxx4",
//             "title": "Ant Design Pro",
//             "logo": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
//             "description": "那时候我只会想自己想要什么，从不想自己拥有什么",
//             "updatedAt": "2017-07-23T00:00:00.000Z",
//             "member": "程序员日常",
//             "href": "",
//             "memberLink": ""
//         },
//         {
//             "id": "xxx5",
//             "title": "Bootstrap",
//             "logo": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
//             "description": "凛冬将至",
//             "updatedAt": "2017-07-23T00:00:00.000Z",
//             "member": "高逼格设计天团",
//             "href": "",
//             "memberLink": ""
//         },
//         {
//             "id": "xxx6",
//             "title": "React",
//             "logo": "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png",
//             "description": "生命就像一盒巧克力，结果往往出人意料",
//             "updatedAt": "2017-07-23T00:00:00.000Z",
//             "member": "骗你来学计算机",
//             "href": "",
//             "memberLink": ""
//         }
//     ],
//     "notifyCount": 12,
//     "unreadCount": 11,
//     "country": "China",
//     "geographic": {
//         "province": {
//             "label": "浙江省",
//             "key": "330000"
//         },
//         "city": {
//             "label": "杭州市",
//             "key": "330100"
//         }
//     },
//     "address": "西湖区工专路 77 号",
//     "phone": "0752-268888888"
// }
//   return request('/api/currentUser');
// }

export async function queryProvince() {
  return [
    {
        "name": "北京市",
        "id": "110000"
    },
    {
        "name": "天津市",
        "id": "120000"
    },
    {
        "name": "河北省",
        "id": "130000"
    },
    {
        "name": "山西省",
        "id": "140000"
    },
    {
        "name": "内蒙古自治区",
        "id": "150000"
    },
    {
        "name": "辽宁省",
        "id": "210000"
    },
    {
        "name": "吉林省",
        "id": "220000"
    },
    {
        "name": "黑龙江省",
        "id": "230000"
    },
    {
        "name": "上海市",
        "id": "310000"
    },
    {
        "name": "江苏省",
        "id": "320000"
    },
    {
        "name": "浙江省",
        "id": "330000"
    },
    {
        "name": "安徽省",
        "id": "340000"
    },
    {
        "name": "福建省",
        "id": "350000"
    },
    {
        "name": "江西省",
        "id": "360000"
    },
    {
        "name": "山东省",
        "id": "370000"
    },
    {
        "name": "河南省",
        "id": "410000"
    },
    {
        "name": "湖北省",
        "id": "420000"
    },
    {
        "name": "湖南省",
        "id": "430000"
    },
    {
        "name": "广东省",
        "id": "440000"
    },
    {
        "name": "广西壮族自治区",
        "id": "450000"
    },
    {
        "name": "海南省",
        "id": "460000"
    },
    {
        "name": "重庆市",
        "id": "500000"
    },
    {
        "name": "四川省",
        "id": "510000"
    },
    {
        "name": "贵州省",
        "id": "520000"
    },
    {
        "name": "云南省",
        "id": "530000"
    },
    {
        "name": "西藏自治区",
        "id": "540000"
    },
    {
        "name": "陕西省",
        "id": "610000"
    },
    {
        "name": "甘肃省",
        "id": "620000"
    },
    {
        "name": "青海省",
        "id": "630000"
    },
    {
        "name": "宁夏回族自治区",
        "id": "640000"
    },
    {
        "name": "新疆维吾尔自治区",
        "id": "650000"
    },
    {
        "name": "台湾省",
        "id": "710000"
    },
    {
        "name": "香港特别行政区",
        "id": "810000"
    },
    {
        "name": "澳门特别行政区",
        "id": "820000"
    }
]
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
