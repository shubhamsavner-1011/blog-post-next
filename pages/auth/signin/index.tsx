import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../../../styles/signin.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as yup from "yup";
import Email from "next-auth/providers/email";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Login() {
  // const [userInfo, setUserInfo] = useState({email: "", password: ""})
  const [error, setError] = useState<Object | undefined>();
  const [success, setSuccess] = useState();
  const URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const handleGoogle = () => 
    signIn("google",{callbackUrl: `${URL}`})
    
  const handleGithub = () => signIn("github", {
    callbackUrl: `${URL}`
  });
  const handleFacebook = () => 
    signIn("facebook", {callbackUrl: `${URL}`});


  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.email, 'value?????',)
      
      await axios
        .post(`${URL}auth/signin`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          setCookies("token", res?.data?.token);
          setSuccess(res?.data?.token);
          if (res.data) {
            toast.success("Login Successfull !!", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => router.push("/"), 1500);
          }
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message;

          toast.error(`${errorMessage}!!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setError(err?.message);
        });
    },
  });

  return (
    <>
      {success ||
        (error && (
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
        ))}
      <CssBaseline />
      <Container maxWidth="md">
        <Grid
          item
          xs={12}
          md={6}
          style={{ height: "auto", width: 600, margin: "30px auto" }}
        >
          <Paper elevation={3} className={styles.paper}>
            <Typography className={styles.heading}>Sign-In</Typography>

            <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12} md={8} sx={{textAlign:'center'}}>
              <Box>
                <TextField
                  id="standard-basic"
                  name="email"
                  label="Email"
                  variant="standard"
                  style={{ margin: " 10px auto", width:'340px' }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  // onChange={({target}: any)=> setUserInfo({...userInfo, email : target.value})}
                />
              </Box>
              <Box>
                <TextField
                  id="standard-basic"
                  name="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  fullWidth
                  style={{ margin: " 10px auto", width:'340px' }}
                  // onChange={({target}: any)=> setUserInfo({...userInfo, password : target.value})}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Box>
              </Grid>
              <Stack spacing={2} direction="row" className={styles.stack}>
                <Button variant="outlined" type="submit">
                  Sign-In
                </Button>
              </Stack>
            </form>
            <Stack spacing={2} direction="row" className={styles.stack}>
              <Button variant="outlined" onClick={handleGoogle}>
                Sign-in with Google
              </Button>
            </Stack>

            <Stack spacing={2} direction="row" className={styles.stack}>
              <Button variant="outlined" onClick={handleGithub}>
                Sign-In with Github
              </Button>
            </Stack>

            <Stack spacing={2} direction="row" className={styles.stack}>
              <Button variant="outlined" onClick={handleFacebook}>
                Sign-In with Facebook
              </Button>
            </Stack>

            <Link href="/auth/register">Sign Up</Link>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
