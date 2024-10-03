export const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log("Fetch error:", error);
  }
};
