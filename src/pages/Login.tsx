export default function Login() {
  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button>Login</button>
          <div>
            don't have an account <a href=""> register</a>
          </div>
        </div>
      </div>
    </>
  );
}
