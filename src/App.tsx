import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./utils";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <p>Welcome to ai-agent powered by Protorisk</p>
    </ThemeProvider>
  );
};
