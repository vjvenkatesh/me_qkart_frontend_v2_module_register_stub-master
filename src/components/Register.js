import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
 // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
import { useHistory, Link } from "react-router-dom";
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData,setFormData]=useState({username: "", password: "", confirmPassword: ""});
  const [isLoading ,setIsLoading]=useState(false);
  

  const history = useHistory();


  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    const payload={"username":formData.username,"password":formData.password};
    console.log(payload);
    console.log(`${config.endpoint}/auth/register`);
    if(validateInput()){
    try {
      const response = await axios.post(`${config.endpoint}/auth/register`, payload);
      if (response.data.success) {
        setFormData({username: "", password: "", confirmPassword: ""})
        enqueueSnackbar("Registered Successfully", { variant: "success" });
        setIsLoading(false);
        history.push("/login");
      } 
    } 
    catch (error) {
      if (error.response) {
        // Server returned a response with an error status code (e.g., 400, 500)
        if (error.response.status === 400) {
          setIsLoading(false);
          enqueueSnackbar(error.response.data.message || "Registration failed", { variant: "error" });
        }
      }
      else if(error.request) {
        setIsLoading(false);
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable, and returns valid JSON.", { variant: "error" });
      }
  }
  setIsLoading(false);
}
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
const validateInput = () => {
    const { username, password, confirmPassword } = formData;

    if (username.trim() === "") {
      enqueueSnackbar("Username is a required field", { variant: "error" });
      return false;
    }

    if (username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "error" });
      return false;
    }

    if (password.trim() === "") {
      enqueueSnackbar("Password is a required field", { variant: "error" });
      return false;
    }

    if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "error" });
      return false;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return false;
    }

    return true;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegisterClick = () => {
   
    if (validateInput()) {
      setIsLoading(true);
      register(formData);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
      
    >
      <Header children="register" />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleInputChange}
            value={formData.username}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleInputChange}
            value={formData.password}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleInputChange}
            value={formData.confirmPassword}
          />
          {isLoading ? (<div className="my_loading"><CircularProgress color="success"/></div>):(<Button className="button" variant="contained" onClick={handleRegisterClick}>REGISTER NOW</Button>)}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to="/login" className="link" href="#">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>

      <Footer />
    </Box>
  );
};

export default Register;
