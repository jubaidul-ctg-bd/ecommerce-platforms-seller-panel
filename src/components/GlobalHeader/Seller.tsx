import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);


class Sellder extends React.Component {

  
 render() {
   return (
      <div id="components-dropdown-demo-dropdown-button">
      
      <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
        Seller
      </Dropdown.Button>
    </div>
   );
 }
}

export default Sellder;