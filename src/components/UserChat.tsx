import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
      <Paper sx={{ m: -3, p: 3 }}>
        <TextField
          fullWidth
          id="message"
          variant="filled"
          size="small"
          InputProps={{ disableUnderline: true }}
        />
      </Paper>
    </Box>
  );
};
