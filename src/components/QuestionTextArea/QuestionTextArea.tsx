import React, { FC } from 'react';
import { Form, Input } from 'antd';
import { QuestionTextAreaPropsType } from './interface';

const QuestionTextArea: FC<QuestionTextAreaPropsType> = (
  props: QuestionTextAreaPropsType
) => {
  const {
    label = '',
    required = false,
    placeholder = '',
    maxLength,
    showCount,
    rows,
    componentId,
  } = props;
  return (
    <Form.Item
      label={label}
      name={componentId}
      rules={[{ required: required, message: placeholder }]}
      required={required}
      style={{ marginBottom: 0 }}
    >
      <Input.TextArea
        placeholder={placeholder}
        maxLength={maxLength}
        showCount={showCount}
        rows={rows}
      />
    </Form.Item>
  );
};

export default QuestionTextArea;
