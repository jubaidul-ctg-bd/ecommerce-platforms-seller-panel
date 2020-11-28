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
import {  MinusCircleOutlined, PictureOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Cascader } from 'antd';
import MediaWall from '../../add-product/components/MediaWall';
import { categoryQuery, getTermValue } from '../../add-product/service';
import proSettings from '../../../../../config/defaultSettings';
import { element } from 'prop-types';
import { fromPairs } from 'lodash';
import { TableListItem } from '../data';
import { FormValueType } from '@/pages/ListTableList/components/UpdateForm';




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
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}



export interface FormListFieldData {
  name: string;
  key: number;
  fieldKey: number;
  title: string;
  id: number;
}

const updateForm: FC<BasicFormProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const { submitting } = props;
  const [form] = Form.useForm();
  const [value1, updateValue1] = useState<string>('');
  const [value2, updateValue2] = useState<string>(props.values.images);
  const [value3, updateValue3] = useState<string>('');
  const [name, updateName] = useState<string>('');
  const [options, setOptions] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [productTermValues, setProductTermValue] = useState(props.values.productTermValues)

  console.log("productTermValues=========", productTermValues);
  
  const [formVals, setFormVals] = useState<any>({
    title: props.values.title,
    categories: props.values.category['title'],
    id: props.values.id,
    order: props.values.order,
    description: props.values.description,
    images: props.values.images,
    banner: props.values.banner,
    status: props.values.status,
    slug: props.values.slug,
    price: props.values.price,
    productAttributes: productTermValues,
    quantity: props.values.quantity,
  });

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  useEffect(() => {
    getOptions();     
  },[])

  form.setFieldsValue ({
    icon: value1,
    images:value2,
    banner: value3,
    productAttributes: productTermValues,
  });   
  console.log(value1, value2, value3);
  
  
  const getOptions = async() => {
    let val = await categoryQuery();
    setOptions(val);
    console.log('val from getoptions:', val);
  }

  const update = {
    value1,
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
      type: 'ProductAdd/submitRegularForm',
      payload: values,
    });
    form.resetFields()
    setProductTermValue([])
    updateValue1('');
    updateValue2('');
    updateValue3('');
  };

  const onFinishProAttr = (values: { [key: string]: any }) => {
      console.log("onFinishProAttr========", values);
  }

  const onFinishFailed = (errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  const modelreq = (e) => {
    handleModalVisible(true);
    updateName(e);
  }

  const getUrl = (e) => {
    handleModalVisible(e.modelSate);
    updateName(e.name);
    if(e.name=="icon") updateValue1(e.url);
    else if(e.name=="images")updateValue2(e.url);
    else if(e.name=="banner")updateValue3(e.url);
  }

  const onChangeCascader = async(value) => {
    let val = await getTermValue({id: value[value.length - 1]})
    console.log("val====================",val)
   
    setProductTermValue(val)
  }

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
      md: { span: 10, offset: 7 },
    },
  };

  const handleChange = (selectedItems) => {
    setSelectedItems(selectedItems)
  };




  return (
    <Modal
    width={640}
    bodyStyle={{ padding: '32px 40px 48px' }}
    destroyOnClose
    title="Update User"
    visible={updateModalVisible}
    footer={false}
    onCancel={() => handleUpdateModalVisible()}
  >
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          initialValues={{
            title: formVals.title,
            // categories: formVals.categories,
            order: formVals.order,
            description: formVals.description,
            name: formVals.name,
            images: formVals.images,
            slug: formVals.slug,
            price: formVals.price,
            productAttributes: formVals.productTermValues,
            quantity: formVals.quantity,
            // status: formVals.status,
         }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >

          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="formandbasic-form.title.label" />}
            name='title'
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
            name="categories"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.category.required' }),
              },
            ]}
          >
            <Cascader
              fieldNames={{ label: 'title', value: 'id', children: 'childTermValues' }}
              options={options}
              expandTrigger="hover"
              displayRender={displayRender}
              onChange={onChangeCascader}
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
                <Radio value="published">
                  <FormattedMessage id="formandbasic-form.radio.publish" />
                </Radio>
                <Radio value="unpublished">
                  <FormattedMessage id="formandbasic-form.radio.unpublish" />
                </Radio>
              </Radio.Group>
            </div>
          </FormItem>

          <FormItem
            {...formItemLayout}
            name="images"
            label="Images"
            // rules={[
            //   {
            //     required: true,
            //     message: formatMessage({ id: 'formandbasic-form.title.required' }),
            //   },
            // ]}
            
          >            
            <Button icon={<PictureOutlined />} onClick={() => modelreq("images")} >
              Selcet Image
            </Button>
            {update.value2 ? (
              <Input 
                name="images"
                prefix={<Image
                width={50}
                src={proSettings.baseUrl+"/media/image/"+update.value2}
              />} disabled/>
            ) : null}
          </FormItem>

          <FormItem
            name = "productAttributes"
            style = {{margin: 0, minHeight: 0}}
          >
             {productTermValues.map( (value, index) => (
                <FormItem
                  {...formItemLayout}
                  label={value.title}
                >
                  {value.type == 'text' ? (
                    <Input placeholder={value.title} onBlur={(e) => value.productTermValue=e.target.value} defaultValue={value.productTermValue}/>
                  ): null}
                  
                  {value.type == 'single-choice' ? (
                    <Select
                      showSearch
                      placeholder="Select an option"
                      optionFilterProp="children"
                      onChange={(e) => value.productTermValue=e}
                      // onFocus={onFocus}
                      // onBlur={onBlur}
                      onSearch={onSearch}
                      // options={value.termValues}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {value.termValues.map( (element, index) => (
                        <Option value={element.title}>{element.title}</Option>
                      ))}
                    </Select>
                  ): null}
                  
                  {value.type == 'multiple-choice' ? (
                    // value.termValues.filter(o => !selectedItems.includes(o)),
                    <Select
                      mode="multiple"
                      placeholder="Inserted are removed"
                      value={value.productTermValue = selectedItems}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    >
                      {value.termValues.map(item => (
                        console.log("termValues=========", item),
                        <Select.Option key={item.title} value={item.title}>
                          {item.title}
                        </Select.Option>
                      ))}
                    </Select>
                  ): null}
                </FormItem>
              ))}
          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 0 }}>
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

    </Modal>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['ProductAdd/submitRegularForm'],
}))(updateForm);

