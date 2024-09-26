import { useEffect, useState } from "react";
import { Header } from "../components/Header";

//work in progress
export default function Quiz() {
  const [question, setQuestion] = useState([]);
  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://localhost:3000/music/lyrics");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setQuestion(result);
      console.log(question);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="quiz-background">
      <Header></Header>
      <div className="quiz-container">
        <h1>What's the name of the artist with this lyric?</h1>
        <div className="question-container"></div>
        <div className="answer-container">
          <div>aaasdfsd</div>
          <div>basdfsdfa</div>
          <div>casdfasd</div>
          <div>dasdfasdf</div>
        </div>
      </div>
    </div>
  );
}
