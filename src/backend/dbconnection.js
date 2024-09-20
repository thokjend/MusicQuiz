import sql from "msnodesqlv8";

const connectionString =
  "server=THOMAS\\SQLEXPRESS;Database=LyricsQuiz;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";

export function SongExists(artist, title) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) as count FROM dbo.Quiz WHERE Title = ? AND Artist = ?`;

    /* console.log(`Query: ${query}`);
    console.log(`Parameters: Title=${title}, Artist=${artist}`); */

    sql.query(connectionString, query, [title, artist], (err, result) => {
      if (err) {
        /* console.error(`Error during query execution: ${err}`); */
        reject(err);
      } else {
        /* console.log(`Query executed successfully`);
        console.log(`Result: ${JSON.stringify(result)}`); */
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

export function AddLyrics(artist, title, lyrics, answer) {
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
