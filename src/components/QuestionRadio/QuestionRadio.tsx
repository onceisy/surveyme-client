import React, { FC, useEffect, useState } from 'react';
import { QuestionRadioPropsType } from './interface';
import { Col, Form, Radio, Row } from 'antd';
import { chunk } from 'lodash';
import { OptionType } from '@/interface/OptionType';

const QuestionRadio: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
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
      <Radio.Group style={{ width: '100%' }}>
        {chunkOptions.map((arr, i) => {
          return (
            <Row key={i} gutter={16} className="mb-3 last:mb-0">
              {arr.map((o) => {
                const { label, key } = o;
                return (
                  <Col key={key} span={24 / rowCount}>
                    <Radio value={key} style={{ fontSize: '16px' }}>
                      {label}
                    </Radio>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </Radio.Group>
    </Form.Item>
  );
};

export default QuestionRadio;
