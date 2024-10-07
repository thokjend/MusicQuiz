# Music Quiz App

## Overview

This is a full-stack music quiz application built using React for the frontend and Node.js with Express for the backend. It utilizes the [Lyrics.ovh API](https://lyricsovh.docs.apiary.io/) to retrieve song lyrics, and a SQL Server database to store quiz data and user information. Users can log in, participate in a quiz by guessing the correct artist from lyrics, and view the highscore leaderboard.

## Features

- **User Authentication:** Users can register and log in with their credentials.
- **Song Quiz:** Users can play a quiz where they are shown lyrics and have to guess the artist.
- **Add New Songs:** users can add new songs to the quiz.
- **Highscores:** Users' scores are stored in the database, and the leaderboard shows the top scorers.

## Tech Stack

- **Frontend:** React
- **Backend** Node.js, Express
- **Database** SQL Server
- **API:**[Lyrics.ovh](https://lyricsovh.docs.apiary.io/)

## Database Setup

You can set up your own database using SQL Server. Below is the schema for the two main tables:

### `Quiz` Table

This table stores information about the songs for the quiz.

```sql
CREATE TABLE Quiz (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Title VARCHAR(255) NOT NULL,
    Artist VARCHAR(255) NOT NULL,
    Lyrics TEXT NOT NULL,
    Answer VARCHAR(255) NOT NULL
);
```

### `Users` Table

This table stores user information and keeps track of their scores.

```sql
CREATE TABLE Users (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Score INT DEFAULT 0
);
```

Make sure to change/modify the connection to your own database in the project’s backend code (`dbconnection.js` or `mongoDBconn.js`)

## Install

```

npm install concurrently

```

## Running the Application

```

npm run dev

```

The application will be available at `http://localhost:5173/`

```

```
