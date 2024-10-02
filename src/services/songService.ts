export const fetchLyricsFromApi = async (artist: string, title: string) => {
  try {
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${artist}/${title}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.lyrics;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const addSongToDatabase = async (
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
        Answer: artist,
      }),
    });
    if (response.ok) {
      console.log("Song added to database successfully");
      return { success: true };
    } else if (response.status === 400) {
      console.error("Song already exists in the database");
      return {
        success: false,
        message: "This song is already in the database.",
      };
    } else {
      throw new Error("Failed to add song to the database");
    }
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};
