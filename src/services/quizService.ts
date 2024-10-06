export const fetchQuestionData = async () => {
  try {
    const response = await fetch("http://localhost:3000/music/lyrics");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();

    const uniqueArtists = new Set(result.map((song: any) => song.Artist));
    if (uniqueArtists.size < 4) {
      throw new Error("Not enough unique artists in the database");
    }

    const randomIndex = Math.floor(Math.random() * result.length);
    const randomElement = result[randomIndex];
    const randomLyrics = randomElement.Lyrics;
    const correctAnswer = randomElement.Answer;

    const lines = randomLyrics
      .split("\n")
      .filter((line: string) => line.trim() !== "");
    const maxStartIndex = Math.max(0, lines.length - 4);
    const startIndex = Math.floor(Math.random() * maxStartIndex);
    const randomSnippet = lines.slice(startIndex, startIndex + 5).join("\n");

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

    return { question: randomSnippet, correctAnswer, answers: allAnswers };
  } catch (error) {
    console.log("Fetch error:", error);
    return { question: "", correctAnswer: "", answers: [] };
  }
};

export const updateScore = async (username: string | null) => {
  try {
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
    } else {
      console.error("Failed to update score");
    }
  } catch (error) {
    console.error("Error updating score:", error);
  }
};
