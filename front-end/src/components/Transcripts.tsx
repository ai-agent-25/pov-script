import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TranscriptsBreadCrumbs } from "./";
import { cloneDeep } from "lodash";
import { SpeakerTranscript } from "./SpeakerTranscript";
import { RolesAndTranscriptsType, TranscriptsPropsType } from "../types/types";

export const Transcripts = ({ rolesAndTranscripts }: TranscriptsPropsType) => {
  const [selectedSpeaker, setSelectedSpeaker] =
    useState<RolesAndTranscriptsType | null>(null);
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
      currentLinks[1] = selectedSpeaker.role;
      setLinks(currentLinks);
    } else {
      setLinks(["Transcripts"]);
    }
  }, [selectedSpeaker]);

  return (
    <Box>
      <TranscriptsBreadCrumbs
        links={links}
        handleBreadCrumbClick={handleBreadCrumbClick}
      />
      <Box sx={{ mt: 3 }}>
        {selectedSpeaker ? (
          <SpeakerTranscript messages={selectedSpeaker?.messages} />
        ) : (
          rolesAndTranscripts?.map((roleAndTranscript, index) => (
            <Button
              variant="outlined"
              key={index.toString()}
              sx={{ textTransform: "none", display: "block", mb: 1 }}
              onClick={() => setSelectedSpeaker(roleAndTranscript)}
            >
              {roleAndTranscript.role}
            </Button>
          ))
        )}
      </Box>
    </Box>
  );
};
