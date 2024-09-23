import { useState } from "react";

export default function UserAccess() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = () => {
    setUsername("");
    setPassword("");
    setInfoText("");
  };

  const createAccount = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
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
    //link til main
    //window.location.href = "http://localhost:5173/main";
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <h1>{!registerMode ? "Login" : "Register"}</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button
            onClick={() => {
              if (!registerMode) {
                login(username, password);
              } else {
                createAccount(username, password);
              }
            }}
            disabled={username === "" || password === ""}
            className={
              username !== "" && password !== "" ? "active-button" : ""
            }
          >
            {!registerMode ? "Login" : "Create Account"}
          </button>
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
          <div
            className={`info-text ${isSuccess ? "success-text" : "error-text"}`}
          >
            {infoText}
          </div>
        </div>
      </div>
    </>
  );
}
