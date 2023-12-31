import { useState, useEffect } from "react";
import { EditorView } from "@codemirror/view";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import { SpeakerTranscriptPropsType } from "../types/types";

export const SpeakerTranscript = ({ messages }: SpeakerTranscriptPropsType) => {
  const [transcript, setTranscript] = useState("");
  useEffect(() => {
    let currentTranscript = "";
    messages.map((message) => {
      currentTranscript +=
        (message.role === "assistant" ? "AGENT" : message.role.toUpperCase()) +
        "\n" +
        message.content +
        "\n\n";
    });
    currentTranscript = currentTranscript.trim();
    setTranscript(currentTranscript);
  }, [messages]);
  return (
    <CodeMirror
      extensions={[EditorView.lineWrapping]}
      editable={false}
      value={transcript}
      maxHeight="65vh"
      placeholder={"Your script here."}
      theme={aura}
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "normal",
        wordWrap: "break-word",
      }}
    />
  );
};
