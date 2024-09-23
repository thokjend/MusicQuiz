import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddSong from "./pages/AddSong";
import UserAccess from "./pages/UserAccess";
import Main from "./pages/Main";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserAccess />} />
        <Route path="/main" element={<Main />} />
        <Route path="/addsong" element={<AddSong />} />
        {/* <Route path="/quiz" element={<Quiz />} /> */}
      </Routes>
    </Router>
  );
}
