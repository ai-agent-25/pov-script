import { useState, KeyboardEventHandler } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { theme } from "../utils";
import { cloneDeep } from "lodash";

export const UserChat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const currentMessages = cloneDeep(messages);
      currentMessages.push(`@User to Manager: ${message}`);
      setMessages(currentMessages);
      setMessage("");
    }
  };

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
        {messages.map((message, index) => (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 1.5 }}
            key={index.toString()}
          >
            {message}
          </Typography>
        ))}
      </Box>
      <Paper sx={{ m: -3, p: 2.75 }}>
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
            }}
            InputProps={{ disableUnderline: true }}
          />
          <Button
            variant="contained"
            sx={{
              minHeight: "unset",
              minWidth: "unset",
              aspectRatio: "1/1",
              p: 1.5,
            }}
          >
            <SendIcon sx={{ fontSize: "1.25rem" }} />
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
