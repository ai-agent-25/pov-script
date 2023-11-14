export type MessagesType = {
  role: string;
  content: string;
};

export type RolesAndTranscriptsType = {
  role: string;
  messages: MessagesType[];
};

export type ScriptPropsType = {
  script: string;
  setScript: React.Dispatch<React.SetStateAction<string>>;
};

export type SpeakerTranscriptPropsType = {
  messages: MessagesType[];
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
  rolesAndTranscripts: RolesAndTranscriptsType[];
};

export type TranscriptsType = {
  speaker: string;
  transcript: string;
};

export type UserChatPropsType = {
  messages: MessagesType[];
  setMessages: React.Dispatch<React.SetStateAction<MessagesType[]>>;
};
