import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { Dispatch, Link, connect,history } from 'umi';
import { StateType } from './model';
import styles from './style.less';
import {LoginParamsType,fakeAccountLogin} from './service';
import LoginFrom from './components/Login';
import { parse } from 'qs';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch;
  userAndlogin: StateType;
  submitting?: boolean;
}


export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}


// const res = yield.call fakeAccountLogin(params)

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
  );

  
  

const Login: React.FC<LoginProps> = (props) => {
  const { userAndlogin = {}, submitting } = props;
  const { status, type: loginType } = userAndlogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const [showOTP, setshowOTP] = useState(false);
  const [showOTP2, setshowOTP2] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [showNewPass, setshowNewPass] = useState(false);
  const [showShop, setshowShop] = useState(false);
  const [showPasss, setshowPasss] = useState(false);
  const [currentUser, setCurrentUser] = useState<number>();
  const [currStatus, setCurrStatus] = useState<string>();
  let currentStatus = ''
  
  
  const handleSubmit =  (values: LoginParamsType) => {
    
    // console.log('values...............', values);
    
    
    
    
    // let status=''
    if(currentUser!=undefined) values.userId = currentUser
    if(currStatus!=undefined) values.status = currStatus
    fakeAccountLogin(values)
    .then((res) => {
      // console.log('vvvvvvvvvvvvvvvvvvvvvvvv', res);
      setCurrentUser(res.userId)
      currentStatus = res.status;
      
      if(res.status=='invalidOtpCode' ||  res.status=='invalidOtp') message.error('Invalid OTP Code');
      else setCurrStatus(res.status) 

      // console.log('stateeeeeeeee', currentStatus);
      ////////Phone Start////////////

      if (currentStatus == 'oldSeller' && res.otpCode) {
        showOTP ? setshowOTP(false) : setshowOTP(true)
      } else if (currentStatus == 'oldSeller') {
        showPasss ? setshowPasss(false) : setshowPasss(true)
      }
      if (currentStatus == 'setYourShopName') {
        showShop ? setshowShop(false) : setshowShop(true)
      }
      if (currentStatus == 'newSeller') {
        showOTP ? setshowOTP(false) : setshowOTP(true)
      }
      ////////Phone End////////////
      if (currentStatus == 'oldSeller') {
        showPass ? setshowPass(false) : setshowPass(true)
      }if (currentStatus == 'newSeller') {
        showOTP2 ? setshowOTP2(false) : setshowOTP2(true)
      }if (currentStatus == 'setYourPassword') {
        showNewPass ? setshowNewPass(false) : setshowNewPass(true)
      }if (currentStatus == "ok") {
        message.success('Successfully Logged in');
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params as { redirect: string };
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = redirect;
        //     return;
        //   }
        // }
        // history.replace(redirect || '/');
        history.replace('/dashboard/monitor');
      } else {
        
      }
      
      // console.log('status===', status);
      
    }).catch((err) => {
      console.log('Error:',err.message);
    })
   
   
    
    // const { dispatch } = props;
    // dispatch({
    //   type: 'userAndlogin/login',
    //   payload: {
    //     ...values,
    //   },
    // });
    
  };
  
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="Phone">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="OOOOOO（admin/ant.design）" />
          )}
          
            <UserName
            name="cellNo"
            placeholder="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please Provide Your Phone Number',
              },
              {
                pattern: /^01\d{9}$/,
                message: 'Phone Number is not Valid',
              },
            ]}
          />
          {showPasss?
              <UserName
              name="otpCode"
              placeholder="Please Enter Your Password"
              rules={[
                {
                  required: false,
                  message: 'Please Enter Your Password',
                },
              ]}
            />
            :null
          }
        
          {showOTP?
              <UserName
              name="otpCode"
              placeholder="Please Enter Four Digit OTP Code"
              rules={[
                {
                  required: false,
                  message: 'Please Enter Four Digit OTP Code',
                },
              ]}
            />
            :null
          }
          {showShop?
              <UserName
              name="shopName"
              placeholder="Please Enter your SHOP NAME"
              rules={[
                {
                  required: true,
                  message: 'Please Enter your SHOP NAME',
                },
              ]}
            />
            :null
          }
        
        </Tab>
        <Tab key="mobile" tab="Email">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Mobile
            name="mail"
            placeholder="Email: test@gmail.com"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          />
          
          {showOTP2?
              <UserName
              name="otpCode"
              placeholder="Please Enter Four Digit OTP Code"
              rules={[
                {
                  required: false,
                  message: 'Please Enter Four Digit OTP Code',
                },
              ]}
            />
            :null
          }
          {showNewPass ? (
            <Password
            name="newPassword"
            placeholder="Please Enter Your New Password"
            rules={[
              {
                required: false,
                message: 'Please Enter Your New Password',
              },
            ]}
            />
            
          )
            :null
          }
          {showNewPass ? (
            <Password
                name="retypePassword"
                placeholder="Please Enter Your Password Again"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Passwords that you entered does\'t not match!');
                    },
                  }),
                ]}
            />
            
          )
            :null
          }
          {showShop?
              <Mobile
              name="shopName"
              placeholder="Please Enter your SHOP NAME"
              rules={[
                {
                  required: true,
                  message: 'Please Enter your SHOP NAME',
                },
              ]}
            />
            :null
          }
          {showPass?
              <Password
              name="password"
              placeholder="Please Enter Your Password"
              rules={[
                {
                  required: false,
                  message: 'Please Enter Your Password',
                },
              ]}
            />
            :null
          }
          {/* <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          /> */}
        </Tab>
        {/* <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Automatic log-in
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
           Forget password
          </a>
        </div> */}
        <Submit
          loading={submitting}
          style={{marginTop: 0}}
        >Login/Signup</Submit>
        {/* <div className={styles.other}>
          Other login methods
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
          Register account
          </Link>
        </div> */}
      </LoginFrom>
    </div>
  );
};

export default Login;
//   connect(
//   ({
//     userAndlogin,
//     loading,
//   }: {
//     userAndlogin: StateType;
//     loading: {
//       effects: {
//         [key: string]: boolean;
//       };
//     };
//   }) => ({
//     userAndlogin,
//     submitting: loading.effects['userAndlogin/login'],
//   }),
// )(Login);
