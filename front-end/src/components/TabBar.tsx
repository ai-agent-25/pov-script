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
import { keywordsData, scriptData } from "../constants";
import { cloneDeep } from "lodash";
import { removeKeywords } from "../utils/helpers";

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
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [tabs, setTabs] = useState<TabType[]>([
    {
      tab: "@User Chat",
      component: (
        <UserChat
          messages={messages}
          setMessages={setMessages}
          rolesAndTranscripts={rolesAndTranscripts}
          setRolesAndTranscripts={setRolesAndTranscripts}
        />
      ),
    },
    { tab: "@FinUser Chat", component: <FinUserChat /> },
    { tab: "Chat History", component: <ChatHistory /> },
    {
      tab: "Transcripts",
      component: <Transcripts rolesAndTranscripts={rolesAndTranscripts} />,
    },
    {
      tab: "Script",
      component: <Script script={script} setScript={setScript} />,
    },
    { tab: "Step Through", component: <StepThrough /> },
  ]);

  useEffect(() => {
    let splitOnContext = script.split("# CONTEXT")[1];
    let splitOnRoles = splitOnContext.split("\n");
    let currentRolesAndTranscripts = [];
    let trackingIndex: number = 0;
    for (let index = 1; index < splitOnRoles.length - 1; index += 2) {
      if (splitOnRoles[index + 1].indexOf("You are") !== -1) {
        currentRolesAndTranscripts.push({
          role: splitOnRoles[index].slice(0, -1),
          messages: [{ role: "system", content: splitOnRoles[index + 1] }],
        });
      } else {
        trackingIndex = index;
        break;
      }
    }

    trackingIndex += 2;

    let commonTranscript = splitOnRoles
      .splice(trackingIndex, splitOnRoles.length)
      .join("\n");

    currentRolesAndTranscripts = currentRolesAndTranscripts.map((item) => {
      item.messages[0].content =
        item.messages[0].content + "\n" + commonTranscript;
      return item;
    });

    let orchestratorIndex: number = 0;
    currentRolesAndTranscripts.find((item, index) => {
      return item.role === "Orchestrator" ? (orchestratorIndex = index) : null;
    });

    let regexPattern = new RegExp(".*\\b" + "goal" + "\\b.*", "i");
    let match = script.match(regexPattern);
    let goal = match ? match[0].trim() : null;

    let steps = script.split("STEP").slice(1);
    steps = steps.filter((step) => !step.includes("[StepName]"));
    steps = steps.map((step) => "- STEP" + removeKeywords(step, keywordsData));

    let additionalOrchestratorScript = "- GOAL\n" + goal + steps.join("\n");
    currentRolesAndTranscripts[orchestratorIndex].messages[0].content +=
      additionalOrchestratorScript;

    let splitOnOrchestrationLoop = removeKeywords(
      script.split("ORCHESTRATION_LOOP")[1].split("ACTION")[1],
      keywordsData.filter((keyword) => keyword !== "STEP")
    ).replace(/\t/g, "");

    currentRolesAndTranscripts[orchestratorIndex].messages.push({
      role: "user",
      content: splitOnOrchestrationLoop,
    });

    setRolesAndTranscripts(currentRolesAndTranscripts);
    setMessages(currentRolesAndTranscripts[0].messages);
  }, [script]);

  useEffect(() => {
    const newTabs = cloneDeep(tabs);
    newTabs[3].component = (
      <Transcripts rolesAndTranscripts={rolesAndTranscripts} />
    );
    newTabs[0].component = (
      <UserChat
        messages={messages}
        setMessages={setMessages}
        rolesAndTranscripts={rolesAndTranscripts}
        setRolesAndTranscripts={setRolesAndTranscripts}
      />
    );
    newTabs[4].component = <Script script={script} setScript={setScript} />;
    setTabs(newTabs);
  }, [messages, rolesAndTranscripts, script]);

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
