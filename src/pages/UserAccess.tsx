import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { AuthButton } from "../components/AuthButton";
import { InfoText } from "../components/InfoText";
import { createAccount, login } from "../services/userService";

export default function UserAccess() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [infoText, setInfoText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  const reset = () => {
    setUsername("");
    setPassword("");
    setInfoText("");
  };

  const handleFetchData = async (
    username: string,
    password: string,
    registerMode: boolean
  ) => {
    try {
      let response;
      if (registerMode) {
        response = await createAccount(username, password);
      } else {
        response = await login(username, password);
      }

      if (response?.success) {
        setInfoText(registerMode ? "Success! Account created" : "");
        setIsSuccess(true);
        if (!registerMode) {
          window.location.href = "http://localhost:5173/main";
          localStorage.setItem("loggedInUser", username);
        } else {
          setRegisterMode(false);
        }
      } else {
        setInfoText(
          registerMode
            ? "Account creation failed. User already exist."
            : "Login failed. Invalid username or password."
        );
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setInfoText("An error occurred. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <>
      <div className="background-login">
        <div className="container">
          <div className="login-content">
            <h1>{!registerMode ? "Login" : "Register"}</h1>
            <InputBox
              className="input-box"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon="bx bxs-user"
            />
            <InputBox
              className="input-box"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="bx bxs-lock-alt"
            />
            <AuthButton
              onClick={() => {
                handleFetchData(username, password, registerMode);
              }}
              disabled={username === "" || password === ""}
              buttonText={!registerMode ? "Login" : "Create Account"}
              isActive={username !== "" && password !== ""}
            />
            {!registerMode ? (
              <div className="auth-content">
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setRegisterMode(true);
                    reset();
                  }}
                >
                  Register
                </span>
              </div>
            ) : (
              <div className="auth-content">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setRegisterMode(false);
                    reset();
                  }}
                >
                  Login
                </span>
              </div>
            )}
            <InfoText message={infoText} isSuccess={isSuccess} />
          </div>
        </div>
      </div>
    </>
  );
}
