import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { TextField } from "@mui/material";

function UpiPayment(props) {
  return (
    <>
      <div className="addUpi_box payment_box">
        <div className="pbox_line1">
          <ArrowBack
            style={{ color: "#282828", cursor: "pointer" }}
            onClick={props.handleBackToAddMethod}
          />
          <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
            Add UPI ID to Google
          </h2>
        </div>
        <h3>This UPI ID will be saved to your Google Account</h3>
        <div style={{ width: "100%" }}>
          <TextField
            id="standard-basic"
            label="UPI ID"
            variant="standard"
            value={props.valueOfUpi}
            onChange={(e) => props.setValueOfUpi(e.target.value)}
            style={{ width: "100%" }}
            error={props.emptyField ? true : false}
          />
          <h4>UPI ID format is mobilenumber@bank or name@bank</h4>
        </div>
        <h4>
          By continuing, you agree to the Google Payments Terms of Service. The
          Privacy Notice describes how your data is handled.
        </h4>
        <button className="payBtn" onClick={() => props.handlePurchase()}>
          Buy
        </button>
      </div>
    </>
  );
}

export default UpiPayment;
