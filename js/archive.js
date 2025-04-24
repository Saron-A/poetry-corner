let input = document.querySelector("#search");

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await axios.get("http://Localhost:3000/poems");
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
      let response = await axios.get(`http://localhost:3000/poems/${reqTitle}`);
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

function displaySearchResults(poems) {
  let searchResults = document.querySelector(".search-results");
  searchResults.classList.remove("hidden"); // Show results
  searchResults.innerHTML = ""; // Clear previous results

  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = poems.title;

  const h4 = document.createElement("h4");
  h4.textContent = `by ${poems.author}`;

  const p = document.createElement("p");
  p.textContent = `Genre: ${poems.genre}`;

  div.append(h3, p, h4);
  div.classList.add("search-result");

  searchResults.appendChild(div);
}

document.addEventListener("click", (e) => {
  const input = document.querySelector("#search");
  const results = document.querySelector(".search-results");

  if (!input.contains(e.target) && !results.contains(e.target)) {
    results.classList.add("hidden");
  }
});
