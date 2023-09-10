import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        ></IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p
        style={{
          marginBottom: "48px",
          fontWeight: 600,
          color: "#3ea6ff",
          cursor: "pointer",
        }}
        onClick={handleClickOpen}
      >
        Restrictions apply. Learn more here.
      </p>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          style={{
            color: "#fff",
            backgroundColor: "#282828",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          Offer restrictions
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          style={{
            color: "#afafaf",
            backgroundColor: "#282828",
          }}
        >
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Restrictions apply to certain features and vary by device,
            geographical location of the user and others. Learn more
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Price may vary by user. Google reserves the right to change the
            price at any time. For accepted payment methods, see here.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Premium and Music Premium
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Only first-time YouTube Red, Music Premium, YouTube Premium and
            Google Play Music subscribers are eligible for trials, introductory
            offers or promotional pricing. Except for Google Workspace
            Individual edition accounts, Google Workspace accounts are not
            eligible for trials unless they are signing up for student
            subscriptions. Users can only sign up for one trial per payment
            method. Learn more here.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Google reserves the right to cancel trials, introductory offers or
            promotional pricing, refuse sign-ups or block access to a Premium
            subscription at any time if you materially or repeatedly breach the
            YouTube Terms of Service or applicable laws.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Google may make promotions available to you that will be presented
            to you when the offer is made. Multiple promotions may not be
            combined within the same billing cycle. If you are eligible for more
            than one promotion, they may be applied in subsequent billing
            cycles. For recurring subscriptions, you will be charged the full
            monthly price of your subscription on a recurring basis upon expiry
            of the promotion(s) provided to you. Promotions are subject to
            availability and may be modified or terminated at any time and for
            any reason. Promotions may vary by country, billing platform or
            additional eligibility requirements.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Monthly subscription – one-month trial. You'll be automatically
            charged the price listed unless you cancel during your trial, and
            then every month starting on the first billing date until you cancel
            your subscription. Cancel at any time. No refunds or credits for
            partial billing periods. Refund policy
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Family subscription: Invite up to five additional family members to
            join your Google family group, and share your Music Premium and
            YouTube Premium subscription. All family members must be age 13 or
            older, have a Google Account and reside in the same household as the
            family manager. Family subscriptions are available in selected
            countries. Learn more
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Student subscription: Sign up for either a Music Premium or YouTube
            Premium membership as a student and get all the same benefits at a
            discounted rate. YouTube student memberships are only available to
            full-time students at higher education institutions in select
            countries, and eligibility will be verified by a third-party
            verification service.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Student memberships are valid for a maximum of up to four years. At
            the end of each year, you will be required to re-verify your
            eligibility. If you are no longer eligible for discounted student
            pricing, you may transition over to a full-priced YouTube Premium or
            Music Premium membership. You can also cancel your membership at any
            time. Learn more Quebec: Student memberships are valid for a maximum
            of up to four years. At the end of each year, you will be required
            to re-verify your eligibility. If you are no longer eligible for
            discounted student pricing, your membership will expire, and you can
            opt into a full-priced YouTube Premium or Music Premium membership.
            You can cancel your membership at any time. Learn more
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Pre-paid plans: You can make a one-off purchase of a YouTube Premium
            or Music Premium individual membership for a fixed time period on a
            non-recurring basis using the pre-paid plans. Once the time period
            that you purchased ends, the pre-paid plan will automatically
            terminate and you will lose access to your benefits. To maintain
            access to your benefits, you will need to make another purchase with
            options provided by your billing platform or switch to a different
            plan. You may have up to 24 months of pre-paid access.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            You may contact our support team to terminate access to the prepaid
            plan. Note that once your access is terminated, you'll no longer
            have access to your benefits. No partial refunds are available.
            Learn more Prepaid plans are currently available on Android and web
            in select locations. Learn more
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Prepaid plans cannot be combined with other YouTube Premium or Music
            Premium offers, including family or student subscription and free
            trials. Prepaid plans can be subject to limited-time introductory
            offers.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Playback: You must have an Internet connection to stream videos or
            to take them offline.
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            Supported devices Some restrictions may apply for downloads (learn
            more) and streaming limits (learn more).
          </Typography>
          <Typography gutterBottom style={{ fontSize: "14px" }}>
            By completing your purchase, you verify that you are at least 18
            years old and agree to these terms.
          </Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#282828" }}>
          <Button
            autoFocus
            onClick={handleClose}
            style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}
          >
            Done
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
