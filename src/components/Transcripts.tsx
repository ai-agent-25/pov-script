import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
      {speakers.map((speaker, index) => (
        <Button
          variant="outlined"
          key={index.toString()}
          sx={{ textTransform: "none", display: "block", mb: 1 }}
        >
          {speaker}
        </Button>
      ))}
    </Box>
  );
};
