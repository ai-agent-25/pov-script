import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { theme } from "../utils";

export const UserChat = () => {
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
        <TextField
          variant="standard"
          fullWidth
          id="message"
          placeholder="Your message here ..."
          InputProps={{ disableUnderline: true }}
        />
      </Paper>
    </Box>
  );
};
