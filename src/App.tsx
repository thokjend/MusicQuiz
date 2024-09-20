import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddSong from "./pages/AddSong";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/addsong" element={<AddSong />} />
        {/* <Route path="/quiz" element={<Quiz />} /> */}
      </Routes>
    </Router>
  );
}
