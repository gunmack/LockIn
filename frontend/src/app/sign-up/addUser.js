async function addUser(email, username, password) {
  try {
    const response = await fetch("/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      // Handle non-2xx responses (e.g., 400, 500 errors)
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.exists; // Assuming the response is a JSON object
  } catch (error) {
    console.error("Error checking email:", error);
    // Optionally, return or throw a custom error based on the failure
    return { error: "There was an error checking the email." };
  }
}

export default addUser;
