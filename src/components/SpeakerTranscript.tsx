import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import { SpeakerTranscriptPropsType } from "../types/types";

export const SpeakerTranscript = ({ script }: SpeakerTranscriptPropsType) => {
  return (
    <CodeMirror
      editable={false}
      value={script}
      maxHeight="65vh"
      placeholder={"Your script here."}
      theme={aura}
    />
  );
};
