export type KeyValuePair = {
  [key: string]: string | number | boolean | KeyValuePair | undefined;
};

export type SizeProps = 'large' | 'medium' | 'small';
export type TabType = {
  id: number;
  icon: string;
  label: string;
  value: string;
  link?: string;
};

export type TabDataType = {
  value: string;
  link?: string;
};
