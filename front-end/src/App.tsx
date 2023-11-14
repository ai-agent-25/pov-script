import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./utils";
import { TabBar } from "./components";

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TabBar />
    </ThemeProvider>
  );
};
