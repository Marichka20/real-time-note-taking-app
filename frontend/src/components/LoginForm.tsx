import React from "react";

interface LoginFormProps {
  username: string;
  password: string;
  message: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
  onClearMessage: () => void; // New callback to clear the error message
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  message,
  onUsernameChange,
  onPasswordChange,
  onLogin,
  onClearMessage,
}) => {
  // Wrap the onChange events so they clear the error message
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUsernameChange(e);
    if (message) {
      onClearMessage();
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPasswordChange(e);
    if (message) {
      onClearMessage();
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginHeading">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        className="inputField"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="inputField"
      />
      <button onClick={onLogin} className="loginButton">
        Login
      </button>
      {message && <p className="messageText">{message}</p>}
    </div>
  );
};

export default LoginForm;
