import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

export const TranscriptsBreadCrumbs = () => {
  const breadcrumbs = [
    <Link underline="hover" color="inherit" href="/" onClick={() => {}}>
      Transcripts
    </Link>,
    <Chip label="Speaker" color="primary" />,
  ];
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};
