import sql, { promises } from "msnodesqlv8";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.DB_CONNECTION_STRING;

export function SongExists(title, artist) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM dbo.Quiz WHERE Title = ? AND Artist = ?`;

    sql.query(connectionString, query, [title, artist], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });
}

export function GetData() {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM dbo.Quiz";
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function GetUsers() {
  return new Promise((resolve, reject) => {
    const query =
      " SELECT ID, Username, Score\
                    From dbo.Users\
                    WHERE Score > 0 \
                    ORDER BY Score DESC";
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function AddLyrics(title, artist, lyrics, answer) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO dbo.Quiz (Title, Artist, Lyrics, Answer) VALUES (?, ?, ?, ?)`;
    sql.query(
      connectionString,
      query,
      [title, artist, lyrics, answer],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export function CreateUser(username, password) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO dbo.Users (Username, Password) VALUES (?,?)`;
    sql.query(connectionString, query, [username, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function UserExists(username) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM dbo.Users WHERE Username = ?`;
    sql.query(connectionString, query, [username], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });
}

export function LoginUser(username, password) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM dbo.Users WHERE Username = ? AND Password = ?`;
    sql.query(connectionString, query, [username, password], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });
}

export function IncreasePoints(username) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE dbo.Users SET Score = Score + 1 WHERE Username = ?`;
    sql.query(connectionString, query, [username], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
