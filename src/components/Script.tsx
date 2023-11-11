import { useCallback, useState } from "react";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ScriptPropsType } from "../types/types";

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
        value={currentScript}
        height="77vh"
        placeholder={"Your script here."}
        onChange={onChange}
        theme={aura}
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
