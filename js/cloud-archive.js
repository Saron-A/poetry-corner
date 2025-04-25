let input = document.querySelector("#search");

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await axios.get(
      "https://hdskyldktgkkeymviafa.supabase.co/rest/v1/poems",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc2t5bGRrdGdra2V5bXZpYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxNDcsImV4cCI6MjA2MTA3NjE0N30.zUrzNnv8k2spU-9XCwM4-wC7HG0sKLsejXyX4KPgjLw",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc2t5bGRrdGdra2V5bXZpYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxNDcsImV4cCI6MjA2MTA3NjE0N30.zUrzNnv8k2spU-9XCwM4-wC7HG0sKLsejXyX4KPgjLw",
        },
      }
    );
    let poems = response.data;
    console.log(poems);
    showPoems(poems);
  } catch (error) {
    console.error(error);
  }
});

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const reqTitle = input.value.trim();
    try {
      let response = await axios.get(
        `https://hdskyldktgkkeymviafa.supabase.co/rest/v1/poems?title=eq.${reqTitle}`,
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc2t5bGRrdGdra2V5bXZpYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxNDcsImV4cCI6MjA2MTA3NjE0N30.zUrzNnv8k2spU-9XCwM4-wC7HG0sKLsejXyX4KPgjLw",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc2t5bGRrdGdra2V5bXZpYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxNDcsImV4cCI6MjA2MTA3NjE0N30.zUrzNnv8k2spU-9XCwM4-wC7HG0sKLsejXyX4KPgjLw",
          },
        }
      );
      let poems = response.data;
      console.log(poems);
      displaySearchResults(poems);
    } catch (error) {
      console.error("Error fetching poem:", error);
    }

    input.value = ""; // Clear the input field after search
    input.focus(); // Keep the focus on the input field
  }
});

function showPoems(poems) {
  let poetryList = document.querySelector(".poetry-list");
  poetryList.innerHTML = ""; // Clear the list before displaying new poems
  poetryList.classList.add("poem-list");
  poems.forEach((poem) => {
    let poemCard = document.createElement("div");

    let h3 = document.createElement("h3");
    h3.textContent = poem.title;

    let h4 = document.createElement("h4");
    h4.textContent = poem.author;

    let p = document.createElement("p");
    p.textContent = poem.genre;

    poemCard.append(h3, p, h4);
    poetryList.appendChild(poemCard);
    poemCard.classList.add("poem-card");
  });
}
