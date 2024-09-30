import { useState } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export default function AddSong() {
  const [lyrics, setLyrics] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");

  const fetchDataFromApi = async (
    artist: string,
    title: string,
    add: boolean
  ) => {
    /* artist = cleanInput(artist);
    title = cleanInput(title); */

    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist}/${title}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result.lyrics);

      if (add) {
        await addSongToDatabase(title, artist, result.lyrics);
      } else {
        setLyrics(result.lyrics);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addSongToDatabase = async (
    title: string,
    artist: string,
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
          Answer: title,
        }),
      });
      if (response.ok) {
        console.log("Song added to database successfully");
        alert("Song added to database.");
      } else if (response.status === 400) {
        console.error("Song already exists in the database");
        alert("This song is already in the database.");
      } else {
        throw new Error("Failed to add song to the database");
      }
    } catch (error) {
      console.error("Database error:", error);
    }
  };

  return (
    <>
      <div className="addsong-background">
        <Header></Header>
        <div className="addsong-container">
          <h1>Add Song</h1>
          <InputBox
            className=""
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
            icon="none"
          ></InputBox>
          <InputBox
            className=""
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Song Title"
            icon="none"
          ></InputBox>
          <Button
            onClick={() => fetchDataFromApi(artist, title, true)}
            buttonText="Add Song"
          ></Button>
          <Button
            onClick={() => fetchDataFromApi(artist, title, false)}
            buttonText="Get Lyrics"
          ></Button>
        </div>
        <pre className="lyrics-container">{lyrics}</pre>
      </div>
    </>
  );
}
