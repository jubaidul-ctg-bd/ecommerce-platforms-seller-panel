import {
  Form,
  Select,
  Radio,
  Button,
  Card,  
  Input,
  Modal,
  Image,
} from 'antd';
import {  PictureOutlined } from '@ant-design/icons';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Cascader } from 'antd';
import MediaWall from './components/MediaWall';
import { categoryQuery } from './service';


// const options = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     children: [
//       {
//         value: 'hangzhou',
//         label: 'Hangzhou',
//         children: [
//           {
//             value: 'xihu',
//             label: 'West Lake',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     children: [
//       {
//         value: 'nanjing',
//         label: 'Nanjing',
//         children: [
//           {
//             value: 'zhonghuamen',
//             label: 'Zhong Hua Men',
//           },
//         ],
//       },
//     ],
//   },
// ];

// function onChange(value) {
//   //console.log(value);
// }

// Just show the latest item.
function displayRender(label) {
  return label[label.length - 1];
}


function onChange(value) {
  //console.log(value);
}

function onChangeSelect(value) {
  //console.log(`selected ${value}`);
}

function onSearch(val) {
  //console.log('search:', val);
}


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch;
}

const BasicForm: FC<BasicFormProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const { submitting } = props;
  const [form] = Form.useForm();

  const [options, setOptions] = useState([])
  useEffect(() => {
    getOptions();    
  },[])
  
  const getOptions = async() => {
    let val = await categoryQuery();
    setOptions(val);
    console.log('val from getoptions:', val);
    
  }

  const [value, updateValue] = useState<string>(null);
  const [value2, updateValue2] = useState<string>(null);
  const [value3, updateValue3] = useState<string>(null);
  const [name, updateName] = useState<string>(null);
  const update = {
    value,
    value2,
    value3,
    name,
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  // const onChange = (event) => {
  //   const { dispatch } = props;
  //   dispatch({
  //     type: 'categoryAdd/submitRegularForm',
  //     payload: event.target.value,
  //   });
  // };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'categoryAdd/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    console.log('form values: ', publicType);
    
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  const modelreq = (e) => {
    handleModalVisible(true);
    updateName(e);
  }

  const getUrl = (e) => {
    handleModalVisible(e.modelSate);
    updateName(e.name);
    if(e.name=="icon") updateValue(e.url);
    else if(e.name=="image")updateValue2(e.url);
    else if(e.name=="banner")updateValue3(e.url);
    
  }


  return (
    <PageHeaderWrapper 
      // content={<FormattedMessage id="formandbasic-form.basic.description" />}
    >
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandbasic-form.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.title.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'formandbasic-form.title.placeholder' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandbasic-form.category.label" />}
            name="category"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.category.required' }),
              },
            ]}
          >
            <Cascader
              fieldNames={{ label: 'title', value: 'title', children: 'children' }}
              options={options}
              expandTrigger="hover"
              displayRender={displayRender}
              onChange={onChange}
              changeOnSelect={true}              
            />
          </FormItem>      
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandbasic-form.price.label" />}
            name="price"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.price.required' }),
              },
            ]}
          >
          <Input
            defaultValue={100}
            min={0}
            onChange={onChange}
            name="price"
            suffix="TK"
            type="number"
          />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandbasic-form.quantity.label" />}
            name="quantity"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.quantity.required' }),
              },
            ]}
          >
          <Input
            defaultValue={1}
            min={0}
            onChange={onChange}
            name="quantity"
            type="number"
          />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandbasic-form.description.label" />}
            name="description"
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={formatMessage({ id: 'formandbasic-form.description.placeholder' })}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandbasic-form.status.label" />}
            name="status"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.status.required' }),
              },
            ]}
          >
            <div>
              <Radio.Group>
                <Radio value="1">
                  <FormattedMessage id="formandbasic-form.radio.publish" />
                </Radio>
                <Radio value="2">
                  <FormattedMessage id="formandbasic-form.radio.unpublish" />
                </Radio>
              </Radio.Group>
            </div>
          </FormItem>
          

          <FormItem
            {...formItemLayout}
            name="icon"
            label="Icon"
            // rules={[
            //   {
            //     required: true,
            //     message: formatMessage({ id: 'formandbasic-form.title.required' }),
            //   },
            // ]}
          >            
            <Button icon={<PictureOutlined />} onClick={() => modelreq("icon")} >
              Selcet Image
            </Button>
            {update.value ? (
              <Input value={update.value}
                name="icon"
                prefix={<Image
                width={50}
                src={update.value}
              />} disabled/>
            ) : null}
          </FormItem>

          <FormItem
            {...formItemLayout}
            name="image"
            label="Image"
            // rules={[
            //   {
            //     required: true,
            //     message: formatMessage({ id: 'formandbasic-form.title.required' }),
            //   },
            // ]}
            
          >            
            <Button icon={<PictureOutlined />} onClick={() => modelreq("image")} >
              Selcet Image
            </Button>
            {update.value2 ? (
              <Input value={update.value2}
                name="image"
                prefix={<Image
                width={50}
                src={update.value2}
              />} disabled/>
            ) : null}
          </FormItem>

              
          <FormItem
            {...formItemLayout}
            name="banner"
            label="Banner"
          >            
            <Button icon={<PictureOutlined />} onClick={() => modelreq("banner")}>
              Selcet Image
            </Button>
            {update.value3 ? (
              <Input value={update.value3} name="banner" prefix={<Image
                width={50}
                src={update.value3}
              />} disabled/>
            ) : null}
          </FormItem>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="formandbasic-form.form.submit" />
            </Button>
            <Button style={{ marginLeft: 8 }}>
              <FormattedMessage id="formandbasic-form.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>

      <Modal
        destroyOnClose
        title="Media Center"
        visible={createModalVisible}
        onCancel={() => handleModalVisible(false)}
        //footer={null}
        onOk={() => handleModalVisible(false)}
        width={1000}
      >
        <MediaWall 
          updateurl={(e) => getUrl(e)}
          reqName={name}
        >
          
        </MediaWall>
          
      </Modal>

    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['categoryAdd/submitRegularForm'],
}))(BasicForm);
