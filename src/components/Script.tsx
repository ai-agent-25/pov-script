import { useCallback, useState } from "react";
import { aura } from "@uiw/codemirror-theme-aura";
import CodeMirror from "@uiw/react-codemirror";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const Script = () => {
  const initialScript = `# AGENT: InvestorReport		


  REPEAT: 6
    DIALOG
      ROLE: Manager
        ACTION
        - Respond appropriately to the user
        - Tell the user that you can generate the investor report if they don't mention what they want
        - If the user asked you to create the investor report first confirm your understanding with the user and if they confirm call ->DIALOG("CreateReport")
        - If the user also asked you to send out the investor report to the investors, make a note of that
        - If you need to abandon the process, tell the user you are abandoning and call ->ENDAGENT

      ROLE: @User
      Timeout: 20 seconds	
        ACTION
        - Respond in the typical way to the Manager's message


  DIALOGIF: CreateReport [[BREAKPOINT]]
    DIALOG
      ROLE: Manager
        ACTION
        - Send a message to DataAgent to get the data from @FinUser
        - call ->DIALOG("GetData")


    REPEAT: 20
      DIALOG 	
        ROLE: Manager
          ACTIONIF
            INSTRUCT 
              - Consider the StatusData's and StatusReport's feedback and then select one of the following

              IF: You need to get additional data for the report
              - Tell DataAgent what you need
              - Call ->DIALOG("GetData")
    
              IF: You have a sufficient idea and want to write the report or change something about the report
              - Tell ReportWriter what you need
              - Call ->DIALOG("WriteReport")

  DIALOGIF: GetData
    REPEAT: 10
        DIALOG
          ROLE: DataAgent
            CONTEXT
            - Your role is to ask @FinUser for the Data and follow up on any missing data as per the Manager's instructions
            - If @FinUser has provided all the relevant data call ->ENDREPEAT

            ACTION
            - Follow the Manager's instructions

          ROLE: @FinUser
            ACTION
           - Give fictious but plausible data for the SAAS company quarterly results and say typical things that might be said in this situation.

          ROLE: Thinker // Just an observer,
            OBSERVE

          ROLE: StatusData
            OBSERVE

        DIALOG  // Still in the repeat loop
          ROLE: Thinker
            ACTION
            - Consider what @FinUser provided and say if any basic data that investors might expect to see is missing

          ROLE: DataAgent  // just an observer

          ROLE: StatusData

      DIALOG 
        ROLE: DataAgent
          ACTIONCUMENT: InvestorData
          - State all the data that you collected so far

        ROLE: StatusData
          ACTION
          - Report on the status of the data gathering process to the Manager

  DIALOG: WriteReport
    DIALOG
      ROLE: ReportWriter
        ACTION
        - Analyse the following document
        <Document: InvestorData> 
        -If you have issues because the data is not what was expected, state your issues to the the StatusReport.
        -If the data is within expectations tell the StatusReport

        ACTIONCUMENT: InvestorEmail
        -Write a short email report for investors based on that information starting with "Dear Investors"

      ROLE: StatusReport
        ACTION
        - Report on the status of the report writing process to the Manager


# Instruction: UserCommunication
- To communicate with the User you need to send a message =>[You] to <UserName>:<Your message>

# Instruction: SpeakerCommunication
- To communicate with Speakers you need to send a message =>[You] to <Speaker>:<Your message>

# IDENTITY
Manager:
- You are Manager
DataAgent:
- You are DataAgent
Thinker:
- You are Thinker
Assistant:
- You are Assistant
ReportWriter:
- You are ReportWriter
StatusData:
- You are StatusData
StatusReport:
- You are StatusReport
Critic:
- You are Critic
@User:
- You are @User
@FinUser:
- You are @FinUser

Manager, DataAgent, Thinker, Assistant, ReportWriter, Critic, @User, @FinUser, StatusReport, StatusData:
<Instruction: SpeakerCommunication>
Manager, DataAgent:
<Instruction: UserCommunication>
`;
  const [currentScript, setCurrentScript] = useState(initialScript);
  const [script, setScript] = useState(initialScript);
  const onChange = useCallback((val: string) => {
    setCurrentScript(val);
  }, []);

  const handleSave = () => {
    setScript(currentScript);
  };

  return (
    <>
      <CodeMirror
        value={currentScript}
        height="79vh"
        placeholder={"Your script here."}
        onChange={onChange}
        theme={aura}
      />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={currentScript === script}
        >
          Save
        </Button>
      </Box>
    </>
  );
};
