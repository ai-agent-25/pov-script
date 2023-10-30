import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { theme } from "../utils";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number, value: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
    sx: {
      backgroundColor: index === value ? "background.paper" : "inherit",
      textTransform: "none",
      py: 0.5,
      position: "relative",
      "::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
        height: "40%",
        borderRight:
          index === value || index === value - 1 ? "none" : "1px solid grey",
      },
      fontWeight: index === value ? 600 : 200,
    },
  };
}

export const TabBar = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = useState([
    "@User Chat Window",
    "@FinUser Chat Window",
    "Chat History",
    "Transcripts",
    "Script",
    "Step Through",
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { display: "none" },
          }}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index.toString()}
              label={tab}
              {...a11yProps(index, value)}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab, index) => (
        <TabPanel
          key={index.toString()}
          value={value}
          index={index}
          dir={theme.direction}
        >
          {tab}
        </TabPanel>
      ))}
    </Box>
  );
};
