import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

import { AddLyrics, GetData, SongExists } from "./dbconnection.js";

app.use(express.json());
app.use(cors());

app.get("/music/lyrics", async (req, res) => {
  try {
    const result = await GetData();
    res.json(result);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database query error");
  }
});

app.post("/music/lyrics", async (req, res) => {
  try {
    const { Title, Artist, Lyrics, Answer } = req.body;

    /* console.log(`Checking if song exists: Artist=${Artist}, Title=${Title}`); */
    const exists = await SongExists(Title, Artist);

    /* console.log(`Song exists: ${exists}`); */

    if (exists) {
      return res.status(400).send("Song already exists in the database");
    }

    await AddLyrics(Title, Artist, Lyrics, Answer);
    res.status(201).send("Item added successfully");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database insertion error");
  }
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
