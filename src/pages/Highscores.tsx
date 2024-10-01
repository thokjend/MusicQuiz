import { useEffect, useState } from "react";
import { TableHeader } from "../components/TableHeader";
import { TableBody } from "../components/TableBody";
import { Header } from "../components/Header";

export default function Highscores() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("Fetch error:", error);
    }
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
