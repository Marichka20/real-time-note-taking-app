import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { setUsername, setPassword, setMessage, login } from "../store";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.login.username);
  const password = useAppSelector((state) => state.login.password);
  const message = useAppSelector((state) => state.login.message);

  // Check if the user is already logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate the token with the server
      axios
        .post("http://localhost:5000/validate-token", { token })
        .then((response) => {
          if (response.data.valid) {
            dispatch(login()); // Automatically log the user in
            navigate("/editor"); // Redirect to the editor
          }
        })
        .catch(() => {
          localStorage.removeItem("token"); // Clear invalid token
        });
    }
  }, [dispatch, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Store the token in local storage
        localStorage.setItem("token", token);

        dispatch(login()); // Dispatch the login action to update isLoggedIn
        navigate("/editor"); // Redirect to the editor route after successful login
      }
    } catch (error) {
      console.log(error);
      dispatch(setMessage("Invalid username or password")); // Dispatch the setMessage action
    }
  };

  // Clears the message when the user starts typing
  const handleClearMessage = () => {
    if (message) {
      dispatch(setMessage(""));
    }
  };

  return (
    <LoginForm
      username={username}
      password={password}
      message={message}
      onUsernameChange={(e) => {
        dispatch(setUsername(e.target.value));
        handleClearMessage();
      }}
      onPasswordChange={(e) => {
        dispatch(setPassword(e.target.value));
        handleClearMessage();
      }}
      onLogin={handleLogin}
      onClearMessage={handleClearMessage}
    />
  );
};

export default Login;
