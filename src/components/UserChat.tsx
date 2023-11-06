import { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { theme } from "../utils";

export const UserChat = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Typography>@User Chat</Typography>
      <Paper sx={{ m: -3, p: 2.75 }}>
        <Stack direction="row" spacing={1.5}>
          <TextField
            variant="standard"
            fullWidth
            value={message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(event.target.value);
            }}
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
