import { useState } from "react";

export default function App() {
  const [lyrics, setLyrics] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");

  const fetchData = async (artist: string, title: string) => {
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
    } catch (error) {
      console.error("Fetch error:", error);
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
      <h3>title</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
      />
      <br />
      <button onClick={() => fetchData(artist, title)}>Get Lyrics</button>
      <br />
      <div>{lyrics}</div>
    </>
  );
}
