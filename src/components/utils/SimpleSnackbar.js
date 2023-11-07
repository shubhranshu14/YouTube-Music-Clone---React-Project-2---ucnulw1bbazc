import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function SimpleSnackbar(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setIsSnackbarOpen(false);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    {
      props.message === "Removed from library" ||
      props.message === "Saved to library"
        ? navigate("/library")
        : navigate("/likedSongs");
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleNavigate}>
        {props.message === "Removed from library" ||
        props.message === "Saved to library"
          ? "View"
          : "Your likes"}
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

  return (
    <div>
      <Snackbar
        open={props.whenLiked}
        autoHideDuration={2000}
        onClose={handleClose}
        message={props.message}
        action={action}
      />
    </div>
  );
}
