import React, { useState } from "react";
import "../styles/offers.css";
import Drawer1 from "./utils/Drawer1";
import { Avatar, Hidden, TextField } from "@mui/material";
import logoImg from "../img/logo.svg";
import loadImg from "../img/Rolling-1s-203px.svg";
import gplayImg from "../img/gplay_yt_logo.webp";
import cardImg from "../img/add_new_option_icon (1).webp";
import paymentLogo from "../img/paymentLogo.webp";
import ytm_logo from "../img/ytm_logo_offer.png";
import {
  Menu,
  Cast,
  Password,
  Logout,
  NavigateNext,
  Close,
  Add,
  ArrowBack,
  Opacity,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import UpiPayment from "./utils/UpiPayment";
import SimpleSnackbar2 from "./utils/SimpleSnackbar2";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Music_premium_offers(props) {
  //for userProfile dropdown
  const [isModal2Open, setIsModal2Open] = useState(false);

  //for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    // document.body.classList.toggle("overflowHidden");
    document.getElementById("overlay").classList.toggle("overlay");
  };

  //for log out

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
      window.location.reload(true);
    }, 2000);
  };
  //for payment gateway
  const [paymentOverlay, setPaymentOverlay] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [rateOfPack, setRateOfPack] = useState(null);
  const [timeOfPack, setTimeOfPack] = useState(null);
  const [payUpi, setPayUpi] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [valueOfUpi, setValueOfUpi] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [messageForPack, setMessageForPack] = useState("");
  const handlePayment = (rate, time) => {
    const boughtPack = localStorage.getItem("PackSub");
    if (boughtPack) {
      // setIsSnackbarOpen(true);
      const subRate = JSON.parse(boughtPack);
      if (subRate === rate) {
        setIsSnackbarOpen(true);
        setMessageForPack("Already Subscribed!");
      } else if (subRate > rate) {
        setIsSnackbarOpen(true);
        setMessageForPack("Already Subscribed to a higher Plan!");
      } else {
        setPaymentOverlay(true);
        document.body.classList.add("overflowHidden");
        setRateOfPack(rate);
        setTimeOfPack(time);
        setTimeout(() => {
          setIsPaymentOpen(true);
        }, 2000);
      }
    } else {
      setPaymentOverlay(true);
      document.body.classList.add("overflowHidden");
      setRateOfPack(rate);
      setTimeOfPack(time);
      setTimeout(() => {
        setIsPaymentOpen(true);
      }, 2000);
    }
  };

  const handlePaymentClose = () => {
    setPaymentOverlay(false);
    document.body.classList.remove("overflowHidden");
    setIsPaymentOpen(false);
  };
  const handleAddPaymentMethod = () => {
    setIsPaymentOpen(false);
    setPaymentMethod(true);
  };
  const handleBackToPayment = () => {
    setIsPaymentOpen(true);
    setPaymentMethod(false);
  };
  const handleAddUpi = () => {
    setPaymentMethod(false);
    setPayUpi(true);
  };
  const handleBackToAddMethod = () => {
    setPayUpi(false);
    setPaymentMethod(true);
    setValueOfUpi("");
    setEmptyField(false);
  };
  const handlePurchase = () => {
    if (valueOfUpi === "") {
      return setEmptyField(true);
    }
    localStorage.setItem("PackSub", JSON.stringify(rateOfPack));
    document.body.classList.remove("overflowHidden");
    setEmptyField(false);
    setIsPaymentOpen(false);
    setPaymentMethod(false);
    setPayUpi(false);
    setValueOfUpi("");
    setTimeout(() => {
      setPaymentOverlay(false);
      handleClick();
    }, 1000);
  };
  //for snackbar of payment msg
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div id="mainDiv">
      <div id="overlay"></div>
      {paymentOverlay ? (
        <div className="payment_overlay">
          {isPaymentOpen ? (
            <div className="payment_box">
              <div className="pbox_line1">
                <Close
                  style={{ color: "#282828", cursor: "pointer" }}
                  onClick={handlePaymentClose}
                />
                <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
                  Complete your purchase
                </h2>
              </div>
              <div className="pbox_line2">
                <div className="pbox_logo">
                  <img src={paymentLogo} alt="logo" />
                  <div>
                    <h3>Music Premium</h3>
                    <h4>Membership</h4>
                  </div>
                </div>
                <div className="price">₹{rateOfPack}.00</div>
              </div>
              <div className="pbox_line2 line3">
                <div className="pbox_logo">
                  <div>
                    <h3>{timeOfPack}-Month Plan</h3>
                    {/* <h4>Access ends: After {timeOfPack} month</h4> */}
                  </div>
                </div>
                <div className="price">₹{rateOfPack}.00</div>
              </div>
              <div className="payment_method pbox_line2">
                <h3>Add payment method</h3>
                <Add
                  style={{ color: "#808080", cursor: "pointer" }}
                  onClick={handleAddPaymentMethod}
                />
              </div>
              <h4>
                By continuing, you verify that you are at least 18 years old and
                agree to these terms.
              </h4>
              <div className="pbox_subline">
                <div className="pbox_line2">
                  <h4>Subtotal</h4>
                  <h4>₹{(rateOfPack - 0.15 * rateOfPack).toFixed(2)}</h4>
                </div>
                <div className="pbox_line2">
                  <h4>Tax</h4>
                  <h4>₹{(0.15 * rateOfPack).toFixed(2)}</h4>
                </div>
              </div>
              <div className="pbox_line2">
                <h3>Total today</h3>
                <h3>₹{rateOfPack}.00</h3>
              </div>
              <button className="payBtn" onClick={handleAddPaymentMethod}>
                BUY
              </button>
            </div>
          ) : !paymentMethod && !payUpi ? (
            <div
              style={{
                color: "white",
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{ position: "fixed", top: "40%", left: "46%" }}
                src={loadImg}
                alt="loading..."
              />
            </div>
          ) : null}
          {paymentMethod ? (
            <div className="payment_box">
              <div className="pbox_line1">
                <ArrowBack
                  style={{ color: "#282828", cursor: "pointer" }}
                  onClick={handleBackToPayment}
                />
                <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
                  Change payment method
                </h2>
              </div>
              <div
                className="pbox_line1"
                style={{
                  borderBottom: "0.2px solid #d0d0d0",
                  paddingBottom: "14px",
                }}
              >
                <img
                  className="cardimg"
                  style={{ filter: "opacity(40%)" }}
                  src={gplayImg}
                  alt="add card"
                />
                <div>
                  <h3 style={{ color: "#afafaf", fontWeight: 400 }}>
                    Google Play balance: ₹0.00
                  </h3>
                  <h4
                    style={{
                      color: "#afafaf",
                      fontWeight: 300,
                      marginTop: "4px",
                    }}
                  >
                    Insufficient funds
                  </h4>
                </div>
              </div>
              <div
                className="pbox_line1"
                style={{ cursor: "pointer" }}
                onClick={handleAddUpi}
              >
                <img className="cardimg" src={cardImg} alt="add card" />
                <h3>Pay with UPI</h3>
              </div>
            </div>
          ) : null}
          {payUpi ? (
            <UpiPayment
              valueOfUpi={valueOfUpi}
              setValueOfUpi={setValueOfUpi}
              emptyField={emptyField}
              handlePurchase={handlePurchase}
              handleBackToAddMethod={handleBackToAddMethod}
            />
          ) : null}
        </div>
      ) : null}

      <nav className="nav4upgrade">
        <div className="nav1">
          <Menu className="menu" onClick={handleDrawer} />
          <img src={logoImg} alt="logo" onClick={() => navigate("/")} />
        </div>
        <div className="nav2">
          <div className="cast" style={{ position: "relative" }}>
            <Cast />
            <div
              style={{
                position: "absolute",
                backgroundColor: "#030303",
                color: "#afafaf",
                whiteSpace: "nowrap",
                padding: "5px",
                fontSize: "12px",
                left: -30,
                borderRadius: "8px",
                display: "none",
              }}
            >
              coming soon.
            </div>
          </div>
          <Avatar
            src="https://yt3.ggpht.com/yti/AOXPAcW6OAwBvclk8TAo4Cy7-92-3eDQYT6JvXCmfrG3HQ=s108-c-k-c0x00ffffff-no-rj"
            style={{
              width: "28px",
              height: "28px",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => setIsModal2Open(!isModal2Open)}
          />
          {isModal2Open ? (
            <div
              className="profilePopup"
              style={{
                backgroundColor: "#262626",
                color: "#fff",
              }}
            >
              <div className="popup_name">
                <Avatar
                  className="popup_name_logo"
                  src="https://yt3.ggpht.com/yti/AOXPAcW6OAwBvclk8TAo4Cy7-92-3eDQYT6JvXCmfrG3HQ=s108-c-k-c0x00ffffff-no-rj"
                />
                <div>
                  <h4>{props.userProfile.name}</h4>
                  <p style={{ fontWeight: 300, fontSize: "14px" }}>
                    {props.userProfile.email}
                  </p>
                </div>
              </div>
              <div className="popup_btns">
                <div
                  className="popup_btn update"
                  onClick={() => navigate("/password-update")}
                >
                  <Password />
                  <p>Update Password</p>
                </div>
                <div className="popup_btn logout" onClick={handleLogout}>
                  <Logout />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <Drawer1 open={drawerOpen} handleDrawer={handleDrawer} />
      </nav>

      <div className="offers_container">
        <div className="offers_ytm_logo_container">
          <img src={ytm_logo} alt="youtube music" />
          <h4>Individual membership</h4>
        </div>
        <div className="pre-paid_plans">
          <div className="offer_title">
            <h3>Pre-paid plans</h3>
            <h4>
              Pay up front. Top up at any time. We accept many forms of payment,
              including UPI.
            </h4>
          </div>
          <div className="offer_rates">
            <div
              className="rates_price"
              onClick={() => handlePayment(990.0, 12)}
            >
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <h3>12-month</h3>
                  <div style={{ backgroundColor: "#06160c", padding: "2px" }}>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#2faa37",
                      }}
                    >
                      Best value
                    </p>
                  </div>
                </div>
                <h4>₹990.00</h4>
              </div>
              <NavigateNext />
            </div>
            <div className="rates_price" onClick={() => handlePayment(309, 3)}>
              <div>
                <h3>3-month</h3>
                <h4>₹309.00</h4>
              </div>
              <NavigateNext />
            </div>
            <div className="rates_price" onClick={() => handlePayment(109, 1)}>
              <div>
                <h3>1-month</h3>
                <h4>₹109.00</h4>
              </div>
              <NavigateNext />
            </div>
          </div>
        </div>
        {/* <div className="sub-plan">
          <div className="offer_title">
            <h3>Subscription plans</h3>
            <h4>
              Automatic payments such as credit cards are required. Billing
              recurs monthly. Cancel at any time.
            </h4>
          </div>
          <div className="offer_rates">
            <div className="rates_price" onClick={handleClick}>
              <div>
                <h3>Monthly subscription</h3>
                <h4>1 month free</h4>
                <h4>₹99/month after trial</h4>
              </div>
              <NavigateNext />
            </div>
          </div>
        </div> */}
        <div className="offers_terms">
          <p>
            Restrictions apply to certain features and vary by device,
            geographical location of the user and others. Learn more
            <br /> Only first-time YouTube Red, YouTube Premium, YouTube Music
            Premium and Google Play Music subscribers are eligible for trials,
            introductory offers or promotional pricing. Except for Google
            Workspace Individual edition accounts, Google Workspace accounts are
            not eligible for trials unless they are signing up for student
            subscriptions. Users can only sign up for one trial per payment
            method. Learn more here.
            <br /> You'll be automatically charged the price listed unless you
            cancel during your trial, and then you'll be charged every month
            starting on the first billing date until you cancel your
            subscription. Cancel at any time. No refunds or credits for partial
            billing periods. Refund policy Family subscription: Invite up to
            five additional family members to join your Google family group, and
            share your YouTube Music Premium and YouTube Premium subscription.
            All family members must be age 13 or older, have a Google Account
            and reside in the same household as the family manager. Family
            subscriptions are available in selected countries. Learn more
            Student subscription: Sign up for either a YouTube Music Premium or
            YouTube Premium membership as a student and get all the same
            benefits at a discounted rate. YouTube student memberships are only
            available to full-time students at higher education institutions in
            select countries, and eligibility will be verified by a third-party
            verification service. Learn more Pre-paid plans: You can make a
            one-off purchase of a YouTube Premium or YouTube Music Premium
            individual membership for a fixed time period on a non-recurring
            basis using the pre-paid plans. Once the time period that you
            purchased ends, the pre-paid plan will automatically terminate and
            you will lose access to your benefits. To maintain access to your
            benefits, you will need to make another purchase with options
            provided by your billing platform or switch to a different plan. You
            may have up to 24 months of pre-paid access. You may contact our
            support team to terminate access to the prepaid plan. Note that once
            your access is terminated, you'll no longer have access to your
            benefits. No partial refunds are available. Learn more
            <br /> Prepaid plans are currently available on Android and web in
            select locations. Learn more <br /> Prepaid plans cannot be combined
            with other YouTube Premium or YouTube Music Premium offers,
            including family or student subscription and free trials. Prepaid
            plans can be subject to limited-time introductory offers. Playback:
            You must have an Internet connection to stream videos or download
            them. Supported devices
            <br /> By completing your purchase, you verify that you are at least
            18 years old and agree to these terms. Price may vary by user.
            Google reserves the right to change the price at any time. For
            accepted payment methods, see here.
          </p>
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Payment Successful!
          </Alert>
        </Snackbar>
        <SimpleSnackbar2
          whenLiked={isSnackbarOpen}
          setIsSnackbarOpen={setIsSnackbarOpen}
          message={messageForPack}
        />
      </div>
    </div>
  );
}

export default Music_premium_offers;
