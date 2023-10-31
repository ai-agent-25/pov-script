import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { TranscriptsBreadCrumbsPropsType } from "../types/types";

export const TranscriptsBreadCrumbs = ({
  links,
  handleBreadCrumbClick,
}: TranscriptsBreadCrumbsPropsType) => {
  const breadcrumbs =
    links.length === 1
      ? [<Typography color="text.primary">{links[0]}</Typography>]
      : [
          <Link
            underline="hover"
            color="inherit"
            href="/"
            onClick={handleBreadCrumbClick}
          >
            {links[0]}
          </Link>,
          <Chip label={links[1]} color="primary" />,
        ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};
