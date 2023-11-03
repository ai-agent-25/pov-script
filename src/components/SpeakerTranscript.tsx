import { useCallback, useState } from "react";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";

export const SpeakerTranscript = () => {
  const [script, setScript] = useState(`SYSTEM
- You are WriterAgent
- You excel at generating written content
- To communicate with the User you need to send a message =>[You] to <UserName>:<Capability>:<Your message>

USER
=> I need help with writing the opening scene of my story.

AGENT
=> Writer to @User: Sure! Could you provide some details about the setting and characters?
 `);
  const onChange = useCallback((val: string) => {
    setScript(val);
  }, []);

  return (
    <CodeMirror
      editable={false}
      value={script}
      maxHeight="65vh"
      placeholder={"Your script here."}
      onChange={onChange}
      theme={aura}
    />
  );
};
