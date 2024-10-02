import { useState } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { fetchLyricsFromApi, addSongToDatabase } from "../services/songService";

export default function AddSong() {
  const [lyrics, setLyrics] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");

  const handleFetchData = async (
    artist: string,
    title: string,
    add: boolean
  ) => {
    try {
      const resultLyrics = await fetchLyricsFromApi(artist, title);
      if (add) {
        const addResult = await addSongToDatabase(title, artist, resultLyrics);
        if (addResult.success) {
          alert("Song added to database.");
        } else {
          alert("This song is already in the database.");
        }
      } else {
        setLyrics(resultLyrics);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="addsong-background">
        <Header />
        <div className="addsong-container">
          <h1>Add Song</h1>
          <InputBox
            className=""
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
            icon="none"
          />
          <InputBox
            className=""
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song Title"
            icon="none"
          />
          <Button
            onClick={() => handleFetchData(artist, title, true)}
            buttonText="Add Song"
          />
          <Button
            onClick={() => handleFetchData(artist, title, false)}
            buttonText="Get Lyrics"
          />
        </div>
        <pre className="lyrics-container">{lyrics}</pre>
      </div>
    </>
  );
}
