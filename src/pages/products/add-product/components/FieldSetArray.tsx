import React, { FC, useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import FieldSet from './FieldSet';

interface CreateFormProps {
    values: []
}


const FieldSetArray: FC<CreateFormProps> = (props) => {
    const { values } = props;
    const [fieldValue, setFieldValue] = useState([])


    // const [formVals, setFormVals] = useState<FormType>({
    //     id: '',
    //     term: '',
    //     termValue: '',
    // });


    
    // PTValue.push(formVals)

    return (
        console.log('form vallue =====',values),
        <>
            {values.map( (item, index) => (
                <>
                <FieldSet key={index}  value={item}/>
                </>
                // fieldValue.push(formVals)
            ))}
        </>
    );
};

export default FieldSetArray;


