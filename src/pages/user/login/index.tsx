import { Form, Button, Col, Input, Popover, Progress, Row, Select, message, Tabs } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { Link, connect, history, FormattedMessage, formatMessage, Dispatch } from 'umi';

import { StateType } from './model';
import { AccountLogin } from './service';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}


const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface RegisterProps {
  dispatch: Dispatch;
  userAndregister: StateType;
  submitting: boolean;
}

export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  prefix: string;
  id: string;
  cellNo: string;
  otpCode: string;
  shopTitle: string;
}

const Register: FC<RegisterProps> = ({ submitting, dispatch, userAndregister }) => {
  const [count, setcount]: [number, any] = useState(0);
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [prefix, setprefix]: [string, any] = useState('88');
  const [popover, setpopover]: [boolean, any] = useState(false);
  const [resStatus, setResStatus] = useState<string>('emailOrCellno');
  const [curUserId, setCurUserId] = useState<number>();
  const [loginForm, setLoginForm] = useState<any>({
    mail: '',
    mobile: '',
    id: '',
    cellNo: '',
    otpCode: '',
    shopTitle: '',
  })

  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  useEffect(() => {
    console.log("userAndregister==================", userAndregister);

    if (!userAndregister) {
      return;
    }
    const account = form.getFieldValue('mail');
    
    
    if (userAndregister.status === 'ok') {
      delete userAndregister.status;
      message.success('Registration success!');
      history.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
    else {
      
    }
  }, [userAndregister]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );
  const onGetCaptcha = () => {
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };
  const onFinish = async(values: any) => {
    if(loginForm.id) values.id = loginForm.id
    if(loginForm.password) values.password = loginForm.password
    if(loginForm.mail) values.mail = loginForm.mail
    if(loginForm.shopTitle) values.shopTitle = loginForm.shopTitle
    if(loginForm.cellNo) values.cellNo = loginForm.cellNo
    if(loginForm.otpCode) values.otpCode = loginForm.otpCode


    let response = await AccountLogin(values);
    if( !(response.status=='ok' || response.status=='setOtp' || response.status=='setPassword' || response.status=='setShop' || response.status=='password') ) {
      message.error(response)
    }
    else if (response.status === 'ok') {
      message.success('login successful!');
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
      history.replace('/dashboard/monitor');
    }
    else {
      setResStatus(response.status)
      setLoginForm(response.user)
      // message.error(response);
      // return;
    }

    // dispatch({
    //   type: 'userAndregister/submit',
    //   payload: {
    //     ...values,
    //     prefix,
    //   },
    // });
  };
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(formatMessage({ id: 'userandregister.password.twice' }));
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setvisible(!!value);
      return promise.reject(formatMessage({ id: 'userandregister.password.required' }));
    }
    // 有值的情况
    if (!visible) {
      setvisible(!!value);
    }
    setpopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };
  const changePrefix = (value: string) => {
    setprefix(value);
  };
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  


  return (
    <div className={styles.main}>
      
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Email" key="1">
          <Form form={form} name="email" onFinish={onFinish}>
            {resStatus == 'emailOrCellno' ? (
              <FormItem
                name="mail"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'userandregister.email.required' }),
                  },
                  {
                    type: 'email',
                    message: formatMessage({ id: 'userandregister.email.wrong-format' }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'userandregister.email.placeholder' })}
                />
              </FormItem>
            ):null} 
            {resStatus == 'setOtp' ? (
              <FormItem
              name="otpCode"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Your Four Digit OTP Code!',
                },
              ]}
            >
              <Input
                size="large"
                placeholder='OTP Code'
              />
            </FormItem>
            ):null} 
          
            {resStatus == 'password' ? (
                <FormItem
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'userandregister.password.required' }),
                    },
                    {
                      validator: checkPassword,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    type="password"
                    placeholder={formatMessage({ id: 'userandregister.password.placeholder' })}
                  />
                </FormItem>
            ):null} 
            {resStatus == 'setPassword' ? (
              <>
                <Popover
                  getPopupContainer={(node) => {
                    if (node && node.parentNode) {
                      return node.parentNode as HTMLElement;
                    }
                    return node;
                  }}
                  content={
                    visible && (
                      <div style={{ padding: '4px 0' }}>
                        {passwordStatusMap[getPasswordStatus()]}
                        {renderPasswordProgress()}
                        <div style={{ marginTop: 10 }}>
                          <FormattedMessage id="userandregister.strength.msg" />
                        </div>
                      </div>
                    )
                  }
                  overlayStyle={{ width: 240 }}
                  placement="right"
                  visible={visible}
                >
                  <FormItem
                    name="password"
                    className={
                      form.getFieldValue('password') &&
                      form.getFieldValue('password').length > 0 &&
                      styles.password
                    }
                    rules={[
                      {
                        validator: checkPassword,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="password"
                      placeholder={formatMessage({ id: 'userandregister.password.placeholder' })}
                    />
                  </FormItem>
              </Popover>
              <FormItem
                name="confirm"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'userandregister.confirm-password.required' }),
                  },
                  {
                    validator: checkConfirm,
                  },
                ]}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({ id: 'userandregister.confirm-password.placeholder' })}
                />
              </FormItem>
              </>
            ): null}
            {resStatus == 'setShop' ? (
              <FormItem
                name="shopTitle"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'userandregister.shopTitle.required' }),
                  },
                ]}
              >
                <Input 
                  size="large"
                  placeholder={formatMessage({ id: 'userandregister.shopTitle.placeholder' })} />
              </FormItem>
            ):null}
            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                Login / Sign Up
              </Button>
            </FormItem>
          
          </Form>
        </TabPane>
      
        <TabPane tab="Phone" key="2">
          <Form form={form2} name="phone" onFinish={onFinish}>
            {resStatus == 'emailOrCellno' ? (
              <InputGroup compact>
                <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '20%' }}>
                  <Option value="88">88</Option>
                  {/* <Option value="87">+87</Option> */}
                </Select>
                <FormItem
                  style={{ width: '80%' }}
                  name="cellNo"
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'userandregister.phone-number.required' }),
                    },
                    {
                      pattern: /^\d{11}$/,
                      message: formatMessage({ id: 'userandregister.phone-number.wrong-format' }),
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder={formatMessage({ id: 'userandregister.phone-number.placeholder' })}
                  />
                </FormItem>
              </InputGroup>
            ):null} 
            {resStatus == 'setOtp' ? (
              <Row gutter={8}>
                <Col span={16}>
                  <FormItem
                    name="otpCode"
                    rules={[
                      {
                        //required: true,
                        message: formatMessage({ id: 'userandregister.verification-code.required' }),
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder={formatMessage({ id: 'userandregister.verification-code.placeholder' })}
                    />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <Button
                    size="large"
                    disabled={!!count}
                    className={styles.getCaptcha}
                    onClick={onGetCaptcha}
                  >
                    {count
                      ? `${count} s`
                      : formatMessage({ id: 'userandregister.register.get-verification-code' })}
                  </Button>
                </Col>
              </Row>
            ):null} 
            {resStatus == 'setShop' ? (
              <FormItem
                name="shopTitle"
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'userandregister.shopTitle.required' }),
                  },
                ]}
              >
                <Input 
                  size="large"
                  placeholder={formatMessage({ id: 'userandregister.shopTitle.placeholder' })} />
              </FormItem>
            ):null} 
        
            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                Login / Sign Up
              </Button>
            </FormItem>
          </Form>
        </TabPane>
        
      </Tabs>

    </div>
  );
};
export default Register
// connect
// (
//   ({
//     userAndregister,
//     loading,
//   }: {
//     userAndregister: StateType;
//     loading: {
//       effects: {
//         [key: string]: boolean;
//       };
//     };
//   }) => ({
//     userAndregister,
//     submitting: loading.effects['userAndregister/submit'],
//   }),
// )(Register);
