export default function Main() {
  return (
    <div className="background-main">
      <div className="main-container">
        <h1>Welcome, logged in user goes here</h1>
        <button
          onClick={() => (window.location.href = "http://localhost:5173/quiz")}
        >
          Quiz
        </button>
        <button
          onClick={() =>
            (window.location.href = "http://localhost:5173/addsong")
          }
        >
          Add song
        </button>
        <button
          onClick={() =>
            (window.location.href = "http://localhost:5173/highscores")
          }
        >
          Highscores
        </button>
      </div>
    </div>
  );
}
