import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

/* import {
  AddLyrics,
  GetData,
  SongExists,
  CreateUser,
  UserExists,
  LoginUser,
  GetUsers,
  IncreasePoints,
} from "./dbconnection.js"; */

import {
  AddLyrics,
  GetData,
  SongExists,
  CreateUser,
  UserExists,
  LoginUser,
  GetUsers,
  IncreasePoints,
} from "./mongoDBconn.js";

app.use(express.json());
app.use(cors());

app.put("/users/:name", async (req, res) => {
  try {
    const { Username } = req.body;
    await IncreasePoints(Username);
    res.status(201).send("Score successfully updated");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database insertion error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await GetUsers();
    res.json(result);
  } catch (err) {
    console.log("SQL error", err);
    res.status(500).send("Database query error");
  }
});

app.get("/music/lyrics", async (req, res) => {
  try {
    const result = await GetData();
    res.json(result);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database query error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const isValidUser = await LoginUser(Username, Password);
    if (!isValidUser) {
      return res.status(401).send("Invalid username or password");
    }

    res.status(200).send("Login successful");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database error");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { Username, Password } = req.body;

    const exitst = await UserExists(Username);
    if (exitst) {
      return res.status(400).send("Username is already in use");
    }

    await CreateUser(Username, Password);
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database insertion error");
  }
});

app.post("/music/lyrics", async (req, res) => {
  try {
    const { Title, Artist, Lyrics, Answer } = req.body;
    const exists = await SongExists(Title, Artist);

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
