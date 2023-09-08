import React, { FC, useEffect, useState } from 'react';
import { QuestionCheckboxPropsType } from './interface';
import { Col, Form, Checkbox, Row } from 'antd';
import { chunk } from 'lodash';
import { OptionType } from '@/interface/OptionType';

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const { label, options = [], required, rowCount = 1, componentId } = props;
  // 分割数组，展示布局
  const [chunkOptions, setChunkOptions] = useState<OptionType[][]>([]);
  useEffect(() => {
    setChunkOptions(chunk(options, rowCount));
  }, [rowCount, options]);

  return (
    <Form.Item
      label={label}
      name={componentId}
      required={required}
      style={{ marginBottom: 0 }}
    >
      <Checkbox.Group style={{ width: '100%', display: 'block' }}>
        {chunkOptions.map((arr, i) => {
          return (
            <Row key={i} gutter={16} className="mb-5 last:mb-0">
              {arr.map((o) => {
                const { label, key } = o;
                return (
                  <Col key={key} span={24 / rowCount}>
                    <Checkbox value={key} style={{ fontSize: '16px' }}>
                      {label}
                    </Checkbox>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </Checkbox.Group>
    </Form.Item>
  );
};

export default QuestionCheckbox;
