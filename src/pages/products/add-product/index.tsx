import {
  Form,
  Select,
  Radio,
  Button,
  Card,  
  Input,
  Modal,
  Image,
  Divider,
} from 'antd';
import {  MinusCircleOutlined, PictureOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, Dispatch, FormattedMessage, formatMessage, useLocation } from 'umi';
import React, { FC, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Cascader } from 'antd';
import MediaWall from './components/MediaWall';
import { categoryQuery, getTermValue, querySlug } from './service';
import proSettings from '../../../../config/defaultSettings';
import { history } from 'umi';
import { element } from 'prop-types';
import { fromPairs } from 'lodash';
import FieldSetArray from './components/FieldSetArray';




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


export interface FormListFieldData {
  name: string;
  key: number;
  fieldKey: number;
  title: string;
  id: number;
}

const BasicForm: FC<BasicFormProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const { submitting } = props;
  const [form] = Form.useForm();
  const [value1, updateValue1] = useState<string>('');
  const [value2, updateValue2] = useState<string>('');
  const [value3, updateValue3] = useState<string>('');
  const [name, updateName] = useState<string>('');
  const [slug, getSlug] = useState<string>('');
  const [options, setOptions] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const location = useLocation<object>()

  if(location.state==undefined) location.state = []
  const [productTermValues, setProductTermValue] = useState([])



  // const [formVals, setFormVals] = useState<FormValueType>({
  //   title: location.state.title,
  //   categories: location.state.categories,
  //   order: location.state.order,
  //   description: location.state.description,
  //   name: location.state.name,
  //   images: location.state.images,
  //   slug: location.state.slug,
  //   price: location.state.price,
  //   productAttributes: location.state.productTermValues,
  //   quantity: location.state.quantity,
  // })

  

  useEffect(() => {
    getOptions();     
  },[])

  form.setFieldsValue ({
    icon: value1,
    images:value2,
    banner: value3,
    slug: slug,
    productAttributes: productTermValues,
  });   
  
  
  const getOptions = async() => {
    let val = await categoryQuery();
    let values = []
    setOptions(val);
    if(location.state.productTermValues==undefined) location.state.productTermValues = []
    else {
      console.log("val====================",location.state.productTermValues)
      let val = await getTermValue({id: location.state.category.id})
      val.map((element, index) => {
        element.productTermValue = location.state.productTermValues[index].termValue
      })
      setProductTermValue(val);
    }
    
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
      type: 'categoryAdd/submitRegularForm',
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

  const handleChange = (selectedItems, value) => {
    console.log("handleChange=======", value, selectedItems);
    setSelectedItems(selectedItems)
    value.productTermValue = selectedItems
  };




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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          initialValues={{
            title: location.state.title,
            categories: location.state.categories,
            order: location.state.order,
            description: location.state.description,
            name: location.state.name,
            images: location.state.images,
            slug: location.state.slug,
            price: location.state.price,
            productAttributes: location.state.productTermValues,
            quantity: location.state.quantity,
            // status: location.state.status,
         }}
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
            <Input onBlur={async(e)=> getSlug(await querySlug({slug: e.target.value}))} placeholder={formatMessage({ id: 'formandbasic-form.title.placeholder' })} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='Slug'
            name='slug'
          >
            <Input disabled placeholder='Slug' />
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

          <Divider orientation="center">Product Attributes</Divider>
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
                    console.log("value.type", value.type),
                    
                    <Select
                      showSearch
                      placeholder="Select an option"
                      optionFilterProp="children"
                      onChange={(e) => value.productTermValue=e}
                      // onFocus={onFocus}
                      // onBlur={onBlur}
                      onSearch={onSearch}
                      defaultValue={value.productTermValue}
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
                      value={value.productTermValue}
                      onChange={(e) => handleChange(e, value)}
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

    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['categoryAdd/submitRegularForm'],
}))(BasicForm);

