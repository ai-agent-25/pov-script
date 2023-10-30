import { useCallback, useState } from "react";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";

export const Script = () => {
  const [script, setScript] = useState("");
  const onChange = useCallback((val: string) => {
    setScript(val);
  }, []);

  return (
    <CodeMirror
      value={script}
      height="86vh"
      placeholder={"Your script here."}
      onChange={onChange}
      theme={aura}
    />
  );
};
