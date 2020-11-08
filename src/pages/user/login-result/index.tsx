import { Button, Result } from 'antd';
import { FormattedMessage, formatMessage, Link, useParams, useHistory, useRouteMatch  } from 'umi';
import React from 'react';
import { RouteChildrenProps, useLocation } from 'react-router';

import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="userandregister-result.register-result.view-mailbox" />
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="userandregister-result.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

const RegisterResult: React.FC<RouteChildrenProps<
  {},
  {
    account: string;
  }
>> = ({ location }) => {
  // const loc = useParams()
  //const locat = useLocation()
  // const match = useRouteMatch()
  // const params = new URL(location.href).searchParams;
  // const msg = params.get('msg');

  var parseQueryString = function() {

    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    return objURL;
};

//Example how to use it: 
var params = parseQueryString();
let msg = decodeURI(params["msg"]); 
  return (
  <Result
    className={styles.registerResult}
    status="error"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="seller-login-faild-result.msg"
          values={{ msg: msg }}
        />
        {/* <div>{msg}</div> */}
      </div>
    }
    // subTitle={formatMessage({ id: 'userandregister-result.register-result.activation-email' })}
    // extra={actions}
  />
);
  }

export default RegisterResult;
