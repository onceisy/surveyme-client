export interface OptionType {
  label: string;
  key: string;
  isSelected?: boolean;
  children?: OptionType[];
}
