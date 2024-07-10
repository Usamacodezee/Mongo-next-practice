import { LinearProgress } from "@mui/material";
import type { FC } from "react";

interface ProgressBarProps {}

const ProgressBar: FC<ProgressBarProps> = ({}) => {
  return <LinearProgress color="info" />;
};
export default ProgressBar;
