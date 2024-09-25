import { useState } from "react";
import { InputBox } from "../components/InputBox";
import { AuthButton } from "../components/AuthButton";
import { InfoText } from "../components/InfoText";

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

  const createAccount = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
        }),
      });

      if (response.ok) {
        //console.log("user added to database successfully");
        setInfoText("Success! Account created");
        setRegisterMode(false);
        setIsSuccess(true);
      } else if (response.status === 400) {
        //console.log("user already exists in the database");
        setInfoText("A user with this username already exists.");
        setIsSuccess(false);
      } else {
        throw new Error("Failed to user to the database");
      }
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
        }),
      });

      if (response.ok) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "http://localhost:5173/main";
      } else {
        setInfoText("Login failed. Invalid username or password.");
      }
    } catch (error) {
      console.error("Database error:", error);
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
                if (!registerMode) {
                  login(username, password);
                } else {
                  createAccount(username, password);
                }
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
