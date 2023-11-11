export type MessagesType = {
  role: string;
  content: string;
};

export type ScriptPropsType = {
  script: string;
  setScript: React.Dispatch<React.SetStateAction<string>>;
};

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

export type TranscriptsBreadCrumbsPropsType = {
  links: string[];
  handleBreadCrumbClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
};

export type TranscriptsPropsType = {
  roles: string[] | null;
};

export type TranscriptsType = {
  speaker: string;
  transcript: string;
};
