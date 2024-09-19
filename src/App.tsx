import { useState } from "react";

export default function App() {
  const [lyrics, setLyrics] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");

  const fetchDataFromApi = async (artist: string, title: string) => {
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist}/${title}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setLyrics(result.lyrics);

      await addSongToDatabase(title, artist, result.lyrics);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addSongToDatabase = async (
    artist: string,
    title: string,
    lyrics: string
  ) => {
    try {
      const response = await fetch("http://localhost:3000/music/lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Title: title,
          Artist: artist,
          Lyrics: lyrics,
          Answer: artist,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add song to the database");
      }
      console.log("Song added to database successfully");
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  return (
    <>
      <h1>Add Song</h1>
      <h3>Artist</h3>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
      />
      <h3>Title</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
      />
      <br />
      <button onClick={() => fetchDataFromApi(artist, title)}>
        Add Song / Get Lyrics
      </button>
      <br />
      <div>{lyrics}</div>
    </>
  );
}
