import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

function SimpleSnackbar2(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setIsSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
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

  return (
    <div>
      <Snackbar
        open={props.whenLiked}
        autoHideDuration={3000}
        onClose={handleClose}
        message={props.message}
        action={action}
      />
    </div>
  );
}

export default SimpleSnackbar2;
