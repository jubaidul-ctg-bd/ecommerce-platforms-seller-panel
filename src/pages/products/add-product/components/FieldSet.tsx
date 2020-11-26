import React, { FC, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { getTermValue } from '../service';
import { Label } from 'bizcharts';

interface CreateFormProps {
    value: {
        id: number,
        title: string,
        termValue: string,
    }
}

interface FormType {
    id: number;
    term: string;
    termValue: string;
}

const FieldSet: FC<CreateFormProps> = (props) => {
    

    const { value } = props;

    // const [formVals, setFormVals] = useState<FormType>({        
    //     id: value.id,
    //     term: value.title,
    //     termValue: value.termValue,
    // });

    const getValue = (e) => {
        // setFormVals({
        //     id: value.id,
        //     term: value.title,
        //     termValue: e.target.value
        // })

        value.termValue=e.target.value
        console.log("value=======",value);

        //setFieldValue(fieldValue)
        // setFieldValue(formVals.concat({
        //     id: value.id,
        //     term: value.title,
        //     termValue: e.target.value
        // }))
       
    }

    // const update = () => {
    //     fieldValue(formVals)
    // }

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
    
    return (
        <>
            <Form.Item 
                name="id"
                hidden={true}
            >
                {value.id}
            </Form.Item>
            <Form.Item 
                {...formItemLayout}
                label={value.title}
            >
                <Input placeholder={value.title} onBlur={(e) => getValue(e)} defaultValue={value.termValue}/>
            </Form.Item>
        </>
    );
};

export default FieldSet;


