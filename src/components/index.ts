import { QuestionCheckboxPropsType } from './QuestionCheckbox/interface';
import QuestionInputPropsType from './QuestionInput/interface';
import { QuestionRadioPropsType } from './QuestionRadio/interface';
import { QuestionTextAreaPropsType } from './QuestionTextArea/interface';
import QuestionTitlePropsType from './QuestionTitle/interface';

// 组件类型的类型
export type ComponentTypesType =
  | 'QuestionTitle'
  | 'QuestionParagraph'
  | 'QuestionInput'
  | 'QuestionCheckbox'
  | 'QuestionRadio'
  | 'QuestionTextArea';

export type ComponentPropsType =
  QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionTextAreaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

export interface QuestionComponentType {
  componentId: string;
  type: ComponentTypesType;
  props: ComponentPropsType;
}
