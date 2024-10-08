import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    Username: String,
    Password: String,
    Score: { type: Number, default: 0 },
  },
  { collection: "users" }
);

const quizSchema = new mongoose.Schema(
  {
    Title: String,
    Artist: String,
    Lyrics: String,
    Answer: String,
  },
  { collection: "songInfo" }
);

const User = mongoose.model("User", userSchema);
const Quiz = mongoose.model("Quiz", quizSchema);

await mongoose.connect(process.env.MONGODB_URI);

export async function GetUsers() {
  try {
    const users = await User.find({ Score: { $gt: 0 } })
      .sort({ Score: -1 })
      .select("Username Score -_id");
    return users;
  } catch (err) {
    throw err;
  }
}

export async function IncreasePoints(username) {
  try {
    const points = await User.updateOne(
      { Username: username },
      { $inc: { Score: 1 } }
    );
    return points;
  } catch (err) {
    throw err;
  }
}

export async function SongExists(title, artist) {
  try {
    const count = await Quiz.countDocuments({ Title: title, Artist: artist });
    return count > 0;
  } catch (err) {
    throw err;
  }
}

export async function CreateUser(username, password) {
  try {
    const createdUser = await User.create({
      Username: username,
      Password: password,
    });
    return createdUser;
  } catch (err) {
    throw err;
  }
}

export async function LoginUser(username, password) {
  try {
    const user = await User.findOne({ Username: username, Password: password });
    return !!user;
  } catch (err) {
    throw err;
  }
}

export async function UserExists(username) {
  try {
    const count = await User.countDocuments({ Username: username });
    return count > 0;
  } catch (err) {
    throw err;
  }
}

export async function GetData() {
  try {
    const data = await Quiz.find({});
    return data;
  } catch (err) {
    throw err;
  }
}

export async function AddLyrics(title, artist, lyrics) {
  try {
    const song = await Quiz.create({
      Title: title,
      Artist: artist,
      Lyrics: lyrics,
      Answer: artist,
    });
    return song;
  } catch (err) {
    throw err;
  }
}
