import { useEffect, useState } from "react";
import { Header } from "../components/Header";

//work in progress
export default function Quiz() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const username = localStorage.getItem("loggedInUser");

  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://localhost:3000/music/lyrics");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      const randomIndex = Math.floor(Math.random() * result.length);
      const randomElement = result[randomIndex];
      const randomLyrics = randomElement.Lyrics;
      const correctAnswer = randomElement.Answer;
      setCorrectAnswer(correctAnswer);

      const lines = randomLyrics
        .split("\n")
        .filter((line: string) => line.trim() !== "");
      const maxStartIndex = Math.max(0, lines.length - 4);
      const startIndex = Math.floor(Math.random() * maxStartIndex);
      const randomSnippet = lines.slice(startIndex, startIndex + 5).join("\n");

      setQuestion(randomSnippet);

      const otherAnswers = new Set<string>();
      while (otherAnswers.size < 3) {
        const randomOtherIndex = Math.floor(Math.random() * result.length);
        const otherSong = result[randomOtherIndex];
        if (
          otherSong.Answer !== correctAnswer &&
          !otherAnswers.has(otherSong.Answer)
        ) {
          otherAnswers.add(otherSong.Answer);
        }
      }

      const allAnswers = [...otherAnswers, correctAnswer].sort(
        () => 0.5 - Math.random()
      );

      setAnswers(allAnswers);
      setChosenAnswer(null);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const submitAnswer = (answer: string) => {
    setChosenAnswer(answer);
    if (answer !== correctAnswer) {
      setTimeout(() => fetchQuestion(), 2000);
    } else {
      setTimeout(() => fetchQuestion(), 2000);
      updateScore();
    }
  };

  const updateScore = async () => {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: username,
      }),
    });
    if (response.ok) {
      console.log("Score updated successfully");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="quiz-background">
      <Header></Header>
      <div className="quiz-container">
        <h1>What's the name of the song with this lyrics?</h1>
        <pre className="question-container">{question}</pre>
        <div className="answer-container">
          {answers.map((answer, index) => (
            <button
              key={index}
              className={
                chosenAnswer
                  ? answer === correctAnswer
                    ? "correct-answer"
                    : answer === chosenAnswer
                    ? "wrong-answer"
                    : ""
                  : "hoverable"
              }
              onClick={() => submitAnswer(answer)}
              disabled={chosenAnswer !== null}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
