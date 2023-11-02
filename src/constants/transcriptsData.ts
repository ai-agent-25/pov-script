import { TranscriptsType } from "../types/types";

export const transcriptsData: TranscriptsType[] = [
  {
    speaker: "Writer",
    transcript: `SYSTEM
- You are WriterAgent
- You excel at generating written content
- To communicate with the User you need to send a message =>[You] to <UserName>:<Capability>:<Your message>

USER
=> I need help with writing the opening scene of my story.

AGENT
=> Writer to @User: Sure! Could you provide some details about the setting and characters?
 `,
  },
];
