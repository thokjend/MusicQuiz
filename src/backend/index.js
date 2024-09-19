import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

import { AddLyrics, GetLyrics } from "./dbconnection.js";

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
