import { useState, useEffect, KeyboardEventHandler } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { theme } from "../utils";
import { clone, cloneDeep } from "lodash";
import { createMessage } from "../services/Api";
import { UserChatPropsType } from "../types/types";

export const UserChat = ({
  messages,
  setMessages,
  rolesAndTranscripts,
  setRolesAndTranscripts,
}: UserChatPropsType) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      let currentMessages = cloneDeep(messages);
      currentMessages.push({
        role: "user",
        content: `@User to Orchestrator: ${message}`,
      });
      setMessages(currentMessages);
      setMessage("");
    }
  };

  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1]?.role === "user") {
      setLoading(true);
      createMessage(currentMessages)
        .then((result) => {
          currentMessages.push(result);
          console.log(currentMessages);
          setMessages(currentMessages);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          maxHeight: "74vh",
          pr: 2,
        }}
      >
        <Typography sx={{ mb: 3 }}>@User Chat</Typography>
        {messages.map(
          (message, index) =>
            index > 0 && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 1.5 }}
                key={index.toString()}
              >
                {message.content}
              </Typography>
            )
        )}
        {loading && (
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Manager to @User:
              <CircularProgress sx={{ ml: 1 }} size={22} thickness={7} />
            </Typography>
          </Box>
        )}
      </Box>
      <Paper sx={{ m: -3, p: 2.75, borderRadius: "5px" }}>
        <Stack direction="row" spacing={1.5}>
          <TextField
            variant="standard"
            fullWidth
            value={message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            id="message"
            placeholder="Your message here ..."
            sx={{
              backgroundColor: theme.palette.action.disabledBackground,
              display: "flex",
              justifyContent: "center",
              p: 0.7,
              px: 1.5,
              borderRadius: "5px",
            }}
            InputProps={{ disableUnderline: true }}
          />
          <Button
            variant="contained"
            disabled={loading || message.trim() === ""}
            sx={{
              minHeight: "unset",
              minWidth: "unset",
              aspectRatio: "1/1",
              p: 1.5,
            }}
            onClick={sendMessage}
          >
            <SendIcon sx={{ fontSize: "1.25rem" }} />
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
