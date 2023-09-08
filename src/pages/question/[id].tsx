import React, { FC, useEffect, useState } from 'react';
import { QuestionInfoType } from '@/interface/QuestionInfo';
import { postAnswer, queryQuestionInfo, queryUserAnswer } from '@/service/question';
import { GetServerSideProps } from 'next';
import { Button, Empty, Form, Result, message, Modal } from 'antd';
import Head from 'next/head';
import QuestionTitle from '@/components/QuestionTitle/QuestionTitle';
import { QuestionComponentType } from '@/components';
import QuestionInput from '@/components/QuestionInput/QuestionInput';
import QuestionTextArea from '@/components/QuestionTextArea/QuestionTextArea';
import QuestionRadio from '@/components/QuestionRadio/QuestionRadio';
import QuestionCheckbox from '@/components/QuestionCheckbox/QuestionCheckbox';
import QuestionParagraph from '@/components/QuestionParagraph/QuestionParagraph';
import { QueryOptionByIds } from '@/service/config';
import { OptionType } from '@/interface/OptionType';
import { adminUrl } from '@/service/constant';
import { ExclamationCircleOutlined } from '@ant-design/icons';

type FromValuesType = {
  [key: string]: any;
};

const QuestionPage: FC<QuestionInfoType> = (props: QuestionInfoType) => {
  const [userId, setUserId] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { _id: questionId, title, cover, componentList } = props;

  const initialValues: FromValuesType = {};
  componentList?.forEach((c) => {
    const { componentId, props } = c;
    const { defaultValue } = props;
    if (defaultValue) {
      initialValues[componentId] = defaultValue;
    }
  });

  /**
   * @description: 生成问卷组件
   * @param {QuestionComponentType} component
   * @return {FC}
   */
  function genComponents(component: QuestionComponentType) {
    const { type, props: componentProps, componentId } = component;
    if (type === 'QuestionTitle') return <QuestionTitle {...componentProps} />;
    if (type === 'QuestionInput')
      return <QuestionInput {...componentProps} componentId={componentId} />;
    if (type === 'QuestionTextArea')
      return <QuestionTextArea {...componentProps} componentId={componentId} />;
    if (type === 'QuestionRadio')
      return <QuestionRadio {...componentProps} componentId={componentId} />;
    if (type === 'QuestionCheckbox')
      return <QuestionCheckbox {...componentProps} componentId={componentId} />;
    if (type === 'QuestionParagraph')
      return <QuestionParagraph {...componentProps} />;
  }

  async function postData2Server(params: any) {
    try {
      const res = await postAnswer(params);
      if (res.code === 200) {
        message.success('提交成功！');
        setIsSubmitted(true);
        setUserId(params.creator);
      } else {
        message.error('提交失败，请稍后再试！');
      }
    } catch (error) {
      message.error('提交失败，请稍后再试！');
    }
  }

  async function onFinish(values: any) {
    const data = [];
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        let label = values[key];
        const component = componentList?.find((c) => c.componentId === key);
        const { type: componentType, props = {} } = component || {};
        const { options = [] } = props;
        // 多选
        if (Array.isArray(values[key])) {
          label = [];
          values[key].forEach((v: string) => {
            const option = options.find((o: OptionType) => o.key === v);
            if (option) {
              label.push(option.label);
            }
          });
        } else {
          const option = options.find((o: OptionType) => o.key === values[key]);
          if (option) {
            label = option.label;
          }
        }
        data.push({
          componentId: key,
          value: values[key],
          componentType,
          label,
        });
      }
    }
    const params = {
      data,
      os: navigator.userAgent,
      questionId,
      creator: localStorage.getItem('userId') || '',
    };
    const userId = localStorage.getItem('userId') || '';
    const res = await queryUserAnswer({ userId, questionId });
    console.log(res);
    if (res.code === 200) {
      if (res.data.count > 0) {
        Modal.confirm({
          title: '提示',
          content: '您已提交过此问卷，是否覆盖之前的提交？',
          icon: <ExclamationCircleOutlined />,
          okText: '确认',
          onOk() {
            postData2Server(params);
          },
          cancelText: '取消',
          onCancel() {
            console.log('Cancel');
          },
        });
      } else {
        postData2Server(params);
      }
    }
  }

  function onFinishFailed() {
    message.error('请填写完整！');
  }

  function goAdminPage() {
    window.open(adminUrl, '_blank');
  }
  return (
    <div>
      {/* 未提交 */}
      {questionId && !isSubmitted && (
        <div>
          <Head>
            <title>{title}</title>
          </Head>
          <div
            style={{ backgroundImage: `url(${cover})` }}
            className="w-full h-60 bg-cover bg-no-repeat"
          ></div>
          <div
            style={{ marginTop: '-24px' }}
            className="rounded-t-2xl bg-white px-3"
          >
            {componentList?.length ? (
              <Form
                layout="vertical"
                size="large"
                scrollToFirstError={{
                  behavior: 'smooth',
                }}
                initialValues={initialValues}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                {componentList.map((c, index) => (
                  <div key={index} className="py-2">
                    {genComponents(c)}
                  </div>
                ))}
                <Form.Item className="text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: '200px', borderRadius: '4px' }}
                  >
                    提交
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div className="pt-3">
                <Empty description="未设置问题"></Empty>
              </div>
            )}
          </div>
        </div>
      )}
      {/* 已提交 */}
      {questionId && isSubmitted && (
        <Result
          status="success"
          title="问卷提交成功！"
          subTitle={`感谢您的参与！问卷已提交成功，提交的用户id为${userId}，点击下方按钮可免费创建问卷！`}
          extra={[
            <Button type="primary" key="console" onClick={goAdminPage}>
              创建问卷
            </Button>,
          ]}
        />
      )}
      {!questionId && (
        <Result status="404" title="404" subTitle="问卷不存在！" />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id = '' } = ctx.params || {};

  let questionInfo: QuestionInfoType = {} as QuestionInfoType;
  try {
    const res = await queryQuestionInfo(id as string);
    questionInfo = res.data as QuestionInfoType;
    // 获取字典选项
    const { componentList } = questionInfo;
    if (componentList?.length) {
      const optionIds: string[] = [];
      componentList.forEach((c) => {
        const { props = {} } = c;
        if (props.isUseDic) {
          optionIds.push(props.dicId);
        }
      });
      try {
        const optionRes = await QueryOptionByIds(optionIds);
        const { data: options } = optionRes;
        componentList.forEach((c) => {
          const { props } = c;
          if (props.isUseDic) {
            const option = options.find((o: any) => o._id === props.dicId);
            c.props.options = option?.options;
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {}

  return {
    props: {
      ...questionInfo,
    },
  };
};

export default QuestionPage;
