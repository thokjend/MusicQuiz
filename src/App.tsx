import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Highscores from "./pages/Highscores";
import UserAccess from "./pages/UserAccess";
import AddSong from "./pages/AddSong";
import Main from "./pages/Main";
import Quiz from "./pages/Quiz";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserAccess />} />
        <Route path="/main" element={<Main />} />
        <Route path="/addsong" element={<AddSong />} />
        <Route path="/highscores" element={<Highscores />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}
