import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { cloneDeep } from "lodash";

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
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);
  const [links, setLinks] = useState<string[]>(["Transcripts"]);

  const handleBreadCrumbClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setSelectedSpeaker(null);
  };

  useEffect(() => {
    if (selectedSpeaker) {
      const currentLinks = cloneDeep(links);
      currentLinks[1] = selectedSpeaker;
      setLinks(currentLinks);
    } else {
      setLinks(["Transcripts"]);
    }
  }, [selectedSpeaker]);

  return (
    <Box>
      {speakers.map((speaker, index) => (
        <Button
          variant="outlined"
          key={index.toString()}
          sx={{ textTransform: "none", display: "block", mb: 1 }}
          onClick={() => setSelectedSpeaker(speaker)}
        >
          {speaker}
        </Button>
      ))}
    </Box>
  );
};
