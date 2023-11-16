/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Alert,
    Box,
    Button,
    Stack,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import useForm from "hooks/userForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "utils/customAxios";

interface IAuthPage { }

const AuthPage: React.FC<IAuthPage> = () => {
    const navigate = useNavigate();

    const { form, handleTextBox, setAllErrors, errors } = useForm(
        {
            email: "",
            password: "",
        },
        {
            debugging: false,
        }
    );

    useEffect(() => {
        console.log(form);
    }, [form]);

    // const validate = () => {
    //     const error: Record<string, string> = {};
    //     const emailRegex =
    //         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //     console.log(!emailRegex.test(form.email));
    //     if (!emailRegex.test(form.email)) {
    //         error.email = "Invalid email";
    //     }
    //     // const passwordRegex: RegExp = new RegExp(
    //     //     "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    //     // );

    //     // if (!passwordRegex.test(form.password)) {
    //     //     // if (form.password.length < 8) {
    //     //     error.password =
    //     //         "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    //     // }
    //     setAllErrors(error);
    // };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flex: "1 1 auto",
                }}
            >
                <Grid container sx={{ flex: "1 1 auto" }}>
                    <Grid
                        item
                        md={12}
                        sm={12}
                        lg={12}
                        sx={{
                            backgroundColor: "background.paper",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "background.paper",
                                flex: "1 1 auto",
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: 550,
                                    px: 3,
                                    py: "100px",
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        // height: 32,
                                        // width: 32,
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                    mb={3}
                                >
                                    {/* <img src={LogoImg} /> */}
                                    <Typography variant="h6">Spot MUSIC</Typography>
                                </Box>
                                <div>
                                    <Stack spacing={1} sx={{ mb: 3 }}>
                                        <Typography variant="h4">Login</Typography>
                                        <Typography color="text.secondary" variant="body2">
                                            Login to your account
                                        </Typography>
                                    </Stack>

                                    <form>
                                        <Stack spacing={3}>
                                            <TextField
                                                error={!!errors.email}
                                                fullWidth
                                                helperText={errors.email}
                                                label="Email Address"
                                                name="email"
                                                onChange={handleTextBox("email")}
                                                type="email"
                                                variant="filled"
                                                autoComplete="username"
                                            />
                                            <TextField
                                                error={!!errors.password}
                                                fullWidth
                                                helperText={errors.password}
                                                label="Password"
                                                name="password"
                                                type="password"
                                                onChange={handleTextBox("password")}
                                                variant="filled"
                                                autoComplete="current-password"
                                            />
                                        </Stack>
                                    </form>

                                    <Button
                                        fullWidth
                                        size="large"
                                        sx={{ mt: 3 }}
                                        onClick={async () => {
                                            // validate();
                                            // console.log(errors)
                                            // no errors from validation
                                            //   if (Object.keys(errors).length === 0) {
                                            //   }
                                            try {
                                                const response = await customAxios.post(
                                                    `${import.meta.env.VITE_SERVER_URL}/api/v1/login/`,
                                                    form
                                                );

                                                console.log(response.data);

                                                window.localStorage.setItem('spot-token', response.data?.token)
                                                // const response = await login.mutateAsync(form);
                                                // err check for null token later
                                                //   setTokenStore(
                                                //     response.data?.result?.token,
                                                //     response.data?.result?.expiresOn
                                                //   );
                                                // set the token in axios header coz when user is logged out, the customAxios instance
                                                // will not have the headers set
                                                customAxios.defaults.headers.Authorization = `Bearer ${response.data?.token}`;
                                                navigate('/home');
                                                // fix the typing for err
                                            } catch (err: any) {
                                                console.log(err)
                                                console.log(err?.response?.data?.result);
                                            }
                                        }}
                                        variant="contained"
                                    >
                                        Continue
                                    </Button>
                                    <Alert
                                        color="info"
                                        severity="info"
                                        icon={false}
                                        sx={{
                                            mt: 3,
                                            backgroundColor: "#DAE6FA",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div>
                                            If you want to register, contact poujhit.dev@gmail.com
                                        </div>
                                    </Alert>
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/* <LoadingOverlay open={login.isLoading} /> */}
        </>
    );
};

export default AuthPage;
