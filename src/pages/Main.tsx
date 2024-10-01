import { Button } from "../components/Button";
import { Header } from "../components/Header";

export default function Main() {
  const username = localStorage.getItem("loggedInUser") || "";
  return (
    <div className="background-main">
      <Header />
      <div className="main-container">
        <h1>
          Welcome {username?.charAt(0).toUpperCase() + username?.slice(1)}
        </h1>
        <Button
          onClick={() => (window.location.href = "http://localhost:5173/quiz")}
          buttonText="Quiz"
        />
        <Button
          onClick={() =>
            (window.location.href = "http://localhost:5173/addsong")
          }
          buttonText="Add song"
        />
        <Button
          onClick={() =>
            (window.location.href = "http://localhost:5173/highscores")
          }
          buttonText="Highscores"
        />
      </div>
    </div>
  );
}
