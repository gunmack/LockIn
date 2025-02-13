async function saveList(userName, name, description, deadline) {
  try {
    const response = await fetch("/api/saveList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, name, description, deadline }),
    });

    if (!response.ok) {
      // Handle non-2xx responses (e.g., 400, 500 errors)
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking email:", error);
    // Optionally, return or throw a custom error based on the failure
    return { error: "There was an error checking the email." };
  }
}

export default saveList;
