export type TabPanelPropsType = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
};

export type TabType = {
  tab: string;
  component: JSX.Element;
};
