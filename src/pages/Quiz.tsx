import { Header } from "../components/Header";

export default function Quiz() {
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
