import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  ChatHistory,
  FinUserChat,
  Script,
  StepThrough,
  TabPanel,
  Transcripts,
  UserChat,
} from ".";
import { MessagesType, RolesAndTranscriptsType, TabType } from "../types/types";
import { scriptData } from "../constants";
import { cloneDeep, filter, split } from "lodash";

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
  const [script, setScript] = useState<string>(scriptData);
  const [rolesAndTranscripts, setRolesAndTranscripts] = useState<
    RolesAndTranscriptsType[]
  >([]);
  const [messages, setMessages] = useState<MessagesType[]>([
    {
      role: "system",
      content:
        "SYSTEM\n- You are Manager\n- To communicate with the User you need to send a message =><Your role> to @<UserName>:<Capability>: <Your message>\n- To communicate with Speakers you need to send a message =><Your role> to <Speaker>: <Your message>\n- Please note that you must use @ only when communicating with actual users, if you are referring to your own role or that of another automated agent, just mention the role without @\n- The system has some keywords. ANything in you see in all caps are keywords. Do not change the way you express them in your responses.\nUSER:\n=>@User to Manager: Hi\n- Respond appropriately to the user and ask the user if they want to create an investor report\n- If the user asked you to create the investor report first confirm your understanding with the user and if they confirm respond with ->DIALOG('CreateReport')\n- If the user also asked you to send out the investor report to the investors, make a note of that\n- If you need to abandon the process, tell the user you are abandoning and call ->ENDAGENT",
    },
  ]);
  const [tabs, setTabs] = useState<TabType[]>([
    {
      tab: "@User Chat",
      component: <UserChat messages={messages} setMessages={setMessages} />,
    },
    { tab: "@FinUser Chat", component: <FinUserChat /> },
    { tab: "Chat History", component: <ChatHistory /> },
    { tab: "Transcripts", component: <Transcripts roles={roles} /> },
    {
      tab: "Script",
      component: <Script script={script} setScript={setScript} />,
    },
    { tab: "Step Through", component: <StepThrough /> },
  ]);

  useEffect(() => {
    let splitOnRole = script.split("ROLE: ");
    splitOnRole.splice(0, 1);
    console.log(splitOnRole);

    let rolesFromScript = new Map();
    splitOnRole.map((item) => {
      let role = item.split("\n")[0];
      role = role.split(" ")[0];
      let splitOnAction = item.split(/-(?!>)/);
      splitOnAction.splice(0, 1);
      console.log(splitOnAction);
      splitOnAction = splitOnAction.map((actionItem) =>
        actionItem.replace(/^\s*|\s*$/g, "").replace(/\n[\s\S]*$/, "")
      );
      // console.log(role, splitOnAction);
      if (!rolesFromScript.has(role)) {
        rolesFromScript.set(role, splitOnAction);
      }
    });
    console.log(rolesFromScript);
    let newRoles: string[] = Array.from(rolesFromScript.keys()) as string[];
    setRoles(newRoles);
  }, [script]);

  useEffect(() => {
    const newTabs = cloneDeep(tabs);
    newTabs[3].component = <Transcripts roles={roles} />;
    setTabs(newTabs);
  }, [roles]);

  useEffect(() => {
    const newTabs = cloneDeep(tabs);
    newTabs[4].component = <Script script={script} setScript={setScript} />;
    setTabs(newTabs);
  }, [script]);

  useEffect(() => {
    const newTabs = cloneDeep(tabs);
    newTabs[0].component = (
      <UserChat messages={messages} setMessages={setMessages} />
    );
    setTabs(newTabs);
  }, [messages]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
              label={tab.tab}
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
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};
