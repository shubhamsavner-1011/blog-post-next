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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {setCookies} from 'cookies-next';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone:""
  });
  const [error, setError] = useState<Object | undefined>();
  const [success, setSuccess] = useState();
  const { name, email, password, phone } = userInfo;
  const router = useRouter();


  const handleSubmit = async (e: any) => {
    setCookies('email', email)
    e.preventDefault();
    const response = await axios
      .post(`${URL}auth/signup`, {
        name: name,
        email: email,
        password: password,
        phone: phone
      })
      .then((res) => {
        setSuccess(res?.data?.message);

        if (res.data.statusCode === 201) {
          toast.success("Successfully Registered !!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => router.push("/auth/otp-verify"), 1500);
        }
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message
        if(err?.response?.status !== 422){
          toast.error(`${errorMessage}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setError(errorMessage);
      });
  };

  return (
    <>
      {success && (
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

      {error && (
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
          <Paper elevation={3} className={styles.paper}>
            {success && <Alert severity="success">{success} !!</Alert>}
            <Typography className={styles.heading}>Sign-UP</Typography>

            <form
              onClick={handleSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <TextField
                id="standard-basic"
                label="Name"
                type="text"
                variant="standard"
                style={{ margin: " 10px auto" }}
                onChange={({ target }: any) =>
                  setUserInfo({ ...userInfo, name: target.value })
                }
              />
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                variant="standard"
                style={{ margin: " 10px auto" }}
                onChange={({ target }: any) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
              />
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                variant="standard"
                style={{ margin: "auto" }}
                onChange={({ target }: any) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
              />
              <TextField
                id="standard-basic"
                label="Phone"
                type="number"
                variant="standard"
                style={{ margin: "auto" }}
                onChange={({ target }: any) =>
                  setUserInfo({ ...userInfo, phone: target.value })
                }
              />
              <Stack spacing={2} direction="row" className={styles.stack}>
                <Button variant="outlined" type="submit">
                  Sign-Up
                </Button>
              </Stack>
            </form>

            <Link href="/auth/register">Login</Link>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
