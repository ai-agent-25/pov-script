import { useCallback, useState } from "react";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ScriptPropsType } from "../types/types";
import { EditorView } from "@codemirror/view";

export const Script = ({ script, setScript }: ScriptPropsType) => {
  const [currentScript, setCurrentScript] = useState(script);
  const onChange = useCallback((val: string) => {
    setCurrentScript(val);
  }, []);

  const handleSave = () => {
    setScript(currentScript);
  };

  return (
    <>
      <CodeMirror
        extensions={[EditorView.lineWrapping]}
        value={currentScript}
        height="77vh"
        placeholder={"Your script here."}
        onChange={onChange}
        theme={aura}
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "normal",
          wordWrap: "break-word",
        }}
      />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={currentScript === script}
        >
          Save
        </Button>
      </Box>
    </>
  );
};
