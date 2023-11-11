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
import { MessagesType } from "../types/types";

export const UserChat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessagesType[]>([
    {
      role: "system",
      content:
        "SYSTEM\n- You are Manager\n- To communicate with the User you need to send a message =><Your role> to @<UserName>:<Capability>: <Your message>\n- To communicate with Speakers you need to send a message =><Your role> to <Speaker>: <Your message>\n- Please note that you must use @ only when communicating with actual users, if you are referring to your own role or that of another automated agent, just mention the role without @\n- The system has some keywords. ANything in you see in all caps are keywords. Do not change the way you express them in your responses.\nUSER:\n=>@User to Manager: Hi\n- Respond appropriately to the user and ask the user if they want to create an investor report\n- If the user asked you to create the investor report first confirm your understanding with the user and if they confirm respond with ->DIALOG('CreateReport')\n- If the user also asked you to send out the investor report to the investors, make a note of that\n- If you need to abandon the process, tell the user you are abandoning and call ->ENDAGENT",
    },
  ]);
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
        content: `@User to Manager: ${message}`,
      });
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
            }}
            InputProps={{ disableUnderline: true }}
          />
          <Button
            variant="contained"
            disabled={message.trim() === ""}
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
