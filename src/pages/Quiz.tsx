import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { fetchQuestionData, updateScore } from "../services/quizService";

export default function Quiz() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const username = localStorage.getItem("loggedInUser");

  const getQuestion = async () => {
    const { question, correctAnswer, answers } = await fetchQuestionData();
    setQuestion(question);
    setCorrectAnswer(correctAnswer);
    setAnswers(answers);
    setChosenAnswer(null);
  };

  const submitAnswer = (answer: string) => {
    setChosenAnswer(answer);
    if (answer !== correctAnswer) {
      setTimeout(() => getQuestion(), 2000);
    } else {
      setTimeout(() => getQuestion(), 2000);
      updateScore(username);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className="quiz-background">
      <Header />
      <div className="quiz-container">
        <h1>What's the name of the artist with this lyrics?</h1>
        <pre className="question-container">
          {answers.length < 4
            ? " Not enough data. Please add more songs to the database"
            : question}
        </pre>
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
              {answer.charAt(0).toUpperCase() + answer.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
