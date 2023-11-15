export const scriptData = `# Task: InvestorReport
STEP: ConfirmUserIntention
- Confirm with the User whether they want to run the user report and whether they have any special instructions.
\tDIALOG  
\t\tROLE: Manager  
\t\t\tACTION
\t\t\t- Tell the user that you can generate the investor report if they don't mention what they want and confirm that is what they want to do, taking into account any feedback you receive from the Orchestrator and critic
\t\t\t- If the user asked you to create the investor report first confirm your understanding with the user and tell Orchestrator you have succeeded and give planner the information you gathered then call ->SUCCESS
\t\t\t- If it becomes clear that the user is not coorporating or there is another reason why progress is stalled, send a Message to Orchestrator explaining your failure and call ->FAILURE

\t\t\tTOOLS 
\t\t\t- Slack

\t\tROLE: @User
\t\t\tACTION
\t\t\t- Send a message to Manager responding in the typical way to the Manager's message

\t\tROLE: Critic
\t\t\tACTION
\t\t\t- Send a Message to Manager giving them advice about how they are conducting the conversation

STEP: GetFinInformation
- Then ask FinUser for the financial information and confirm with FinUser that details provided are sufficient
\tDIALOG:
\t\tROLE: Manager
\t\t\tACTION
\t\t\t- Ask FinUser to provide the necessary financial information to you for the investor report.
\t\t\t- If the user asked you to create the investor report first confirm your understanding with the user and tell Orchestrator you have succeeded and give planner the information you gathered then call ->SUCCESS
\t\t\t- If the FinUser also asked you to send out the investor report to the investors, make a note of that
\t\t\t- If it becomes clear that the FinUser is not coorporating or there is another reason why progress is stalled, send a Message to Orchestrator explaining your failure and call ->FAILURE

\t\t\tTOOLS
\t\t\t- Slack

\t\tROLE: @FinUser
\t\t\tACTION
\t\t\t- You are FinUser
\t\t\t- Send a message to Manager responding in the typical way to the Manager's message

\t\tROLE: Critic
\t\t\tACTION
\t\t\t- Send a Message to Manager giving them advice about how they are conducting the conversation


STEP: WriteReport
- Then write a report to the investors based on the information provided by FinUser
	REPEAT: 3
\t\tDIALOG
\t\t\tROLE: Manager
\t\t\t\tACTION
\t\t\t\t- Write an investor report that is 250 words based on the information given to you by FinUser
\t\t\t\t- Analyze the finmodel to get additional insights
\t\t\t\t- draw a few relevant charts

\t\t\tTOOLS   
\t\t\t-> ChartingTool

\t\t\tFILES  
\t\t\t-> finmodel.xls 

\t\t\tROLE: PresentationExpert
\t\t\t\tACTION
\t\t\t\t- Give Manager advice on how the report could be improved


STEP: GetInitialUserApproval
- Then iterate with the User on the report until the User confirms it’s good enough
	DIALOG
\t\tROLE: Manager
\t\t\tACTION
\t\t\t- Iterate with the User until they are happy with the report
\t\t\t- If the user confirms they are happy to send the report out and Message the Orchestrator you have succeeded and then call ->SUCCESS
\t\t\t- If it becomes clear that the user is not coorporating or there is another reason why progress is stalled, send a Message to Orchestrator explaining your failure and call ->FAILURE
\t\tROLE: @User
\t\t\tACTION
\t\t\t- Send a message to Manager responding in the typical way to the Manager's message
\t\tROLE: Critic
\t\t\tACTION
\t\t\t- Send a Message to Manager giving them advice about how they are conducting the conversation


STEP: SendReport
- Then send out the report
\tDIALOG
\t\tROLE: Manager
\t\t\tACTION
\t\t\t- Send the report to the investors

\t\t\tTOOLS
\t\t\t- Email

ORCHESTRATION_LOOP 
\tDIALOG
\t\tROLE: Orchestrator
\t\tSYSTEM 
\t\t- Your goal is to create and send out the investor report by completing the following steps in order. 
\t\tACTION 
\t\t- Based on the conversation so far, pick the next step that needs to be run to best advance the conversation by telling SYSTEM to run ->NEXT_STEP([StepName])
\t\t- Explain your your decision on the next step to the Manager
\t\t- Go back to previous steps if necessary
\t\t- When all steps have been completed successfully call ->END_TASK("Success")

\t\tEVENTS
\t\t- Email
\t\t- Slack

\t\tROLE: Manager


# EXTERNAL_AUTHORIZED
Manager, User, FinUser

# CONTEXT 
Orchestrator:
- You are Orchestrator
Manager:
- You are Manager
@User:
- You are @User
@FinUser:
- You are @FinUser
PresentationExpert:
- You are PresentationExpert
Critic:
- You are Critic

Manager, Orchestor, Critic, @User, @FinUser, PresentationExpert
- To communicate with others you need to send a message using the following format =><Your role> to <Receiver>:<Your message>
- If the user is a human user, append @ in front of their role name
- If it is not specified which Message Type to use, use GROUP
- If you are instructed to call a function in the format ->FunctionName, do so using the following format: [You] to SYSTEM: ->FunctionName(Parameters)
`;
