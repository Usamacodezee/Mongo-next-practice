import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { colors, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function SnackBarComponent() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const buttons = (
    <React.Fragment>
      <Grid container justifyContent="start">
        <Button
          className="mx-1"
          variant="contained"
          sx={{ backgroundColor: "black" }}
          onClick={handleClick({ vertical: "top", horizontal: "left" })}
        >
          Top-Left
        </Button>
        <Button
          className="mx-1"
          variant="contained"
          sx={{ backgroundColor: "black" }}
          onClick={handleClick({ vertical: "top", horizontal: "right" })}
        >
          Top-Right
        </Button>
      </Grid>
      <Grid container justifyContent="start" className="mt-2">
        <Button
          className="mx-1"
          variant="contained"
          sx={{ backgroundColor: "black" }}
          onClick={handleClick({ vertical: "bottom", horizontal: "left" })}
        >
          Bottom-Left
        </Button>
        <Button
          className="mx-1"
          variant="contained"
          sx={{ backgroundColor: "black" }}
          onClick={handleClick({ vertical: "bottom", horizontal: "right" })}
        >
          Bottom-Right
        </Button>
      </Grid>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: 500 }}>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
        action={action}
      />
    </Box>
  );
}
