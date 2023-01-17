import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Alert, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../../../styles/signin.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import otpStyles from "../../../styles/otpVerify.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";

export default function OtpVerify() {
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState<Object | undefined>();
  const [success, setSuccess] = useState();
  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_BASE_URL;
  const handleGoogleSign = () => {
    console.log("google sign-in");
  };

  const signupEmail = getCookie("email");

  const handleChange = (code: any) => setUserInfo(code);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios
      .post(`${URL}auth/validateOtp`, {
        email: signupEmail,
        otp: userInfo,
      })
      .then((res) => {
        const response = res?.data?.message;
        setSuccess(res?.data?.message);
        if (res.data.message === "otp Verified") {
          toast.success(`${response}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => router.push("/auth/signin"), 1500);
        }
      })
      .catch((err) => {
        if (err.statusCode !== 422) {
          toast.error(`${err.message}!!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setError(err?.message);
      });
  };
  return (
    <>
      {success || error && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}

      <CssBaseline />
      <Container maxWidth="md">
        <Grid
          item
          xs={8}
          style={{ height: "500px", width: 600, margin: "30px auto" }}
        >
          <Paper elevation={3} className={`${styles.paper} ${otpStyles.otp}`}>
            {success === "otp Verified" ? (
              <Alert severity="success">{success} !!</Alert>
            ) : (
              <Alert severity="error">{success} !!</Alert>
            )}
            <Typography className={styles.heading}>OTP Verification</Typography>
            <Box
              component="div"
              sx={{
                "& > :not(style)": {
                  width: "40ch",
                  display: "flex",
                  margin: "auto",
                  justifyContent: "center",
                },
              }}
            >
              <TextField
                id="standard-basic"
                type="email"
                variant="standard"
                style={{ margin: " 10px auto" }}
                value={signupEmail}
              />

              <OtpInput
                value={userInfo}
                onChange={handleChange}
                numInputs={4}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  width: "54px",
                  height: "54px",
                  fontSize: "12px",
                  color: "#000",
                  fontWeight: "400",
                  // caretColor: "blue",
                }}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none",
                }}
              />
            </Box>
            <Stack spacing={2} direction="row" className={styles.stack}>
              <Button variant="outlined" onClick={handleSubmit}>
                Send OTP
              </Button>
            </Stack>

            <Link href="/auth/register">Sign Up</Link>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
