export function Header() {
  const username = localStorage.getItem("loggedInUser");
  return (
    <div className="header">
      <div>
        <i className="bx bx-user"></i>
        <span className="username-text">{username}</span>
      </div>
      <ul>
        <li
          onClick={() => (window.location.href = "http://localhost:5173/main")}
        >
          Home
        </li>
        <li
          onClick={() => (window.location.href = "http://localhost:5173/quiz")}
        >
          Quiz
        </li>
        <li
          onClick={() =>
            (window.location.href = "http://localhost:5173/addsong")
          }
        >
          Add song
        </li>
        <li
          onClick={() =>
            (window.location.href = "http://localhost:5173/highscores")
          }
        >
          Highscores
        </li>
      </ul>
    </div>
  );
}
