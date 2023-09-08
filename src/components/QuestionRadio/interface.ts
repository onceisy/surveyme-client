import { OptionType } from '@/interface/OptionType';

export interface QuestionRadioPropsType {
  label?: string;
  required?: boolean;
  // 自定义的选项内容
  options?: OptionType[];
  // 是否使用字典
  isUseDic?: boolean;
  // 使用字典 字典的_id
  dicId?: string;
  // 默认中
  default?: string;
  // 每行选项个数
  rowCount?: 1 | 2 | 3;
  // 默认选中
  defaultValue?: string | string[];
  componentId: string;
}
