import { useEffect, useState } from "react";
import { TableHeader } from "../components/TableHeader";
import { TableBody } from "../components/TableBody";
import { Header } from "../components/Header";
import { fetchUsers } from "../services/highscoresService";

export default function Highscores() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    const fetchResult = await fetchUsers();
    setData(fetchResult);
  };

  return (
    <div className="highscore-background">
      <Header />
      <div className="highscore-container">
        <h1>Quiz Highscores</h1>
        <table>
          <TableHeader />
          <TableBody data={data} />
        </table>
      </div>
    </div>
  );
}
