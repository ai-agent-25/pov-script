import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Transcripts = () => {
  const [speakers, setSpeakers] = useState<string[]>([
    "Writer",
    "Editor",
    "IdeaGenerator",
    "Researcher",
    "PlotAdvisor",
    "WorldBuilder",
    "Formatter",
    "TimelineManager",
    "Critic",
    "@User",
  ]);

  return (
    <Box>
      <Typography>Transcripts</Typography>
    </Box>
  );
};
