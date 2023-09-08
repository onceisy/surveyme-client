import React, { FC } from 'react';
import { Form, Input } from 'antd';
import QuestionInputPropsType from './interface';

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const {
    label = '',
    required = false,
    placeholder = '',
    componentId
  } = props;
  return (
    <Form.Item
      label={label}
      name={componentId}
      rules={[{ required: required, message: placeholder }]}
      required={required}
      style={{ marginBottom: 0 }}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default QuestionInput;
