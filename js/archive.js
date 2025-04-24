let input = document.querySelector("#search");
input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const reqTitle = input.value.trim();
    try {
      let response = await axios.get(`http://localhost:3000/poems/${reqTitle}`);
      let poem = response.data;
      console.log(poem);
    } catch (error) {
      console.error("Error fetching poem:", error);
    }

    input.value = ""; // Clear the input field after search
    input.focus(); // Keep the focus on the input field
  }
});
