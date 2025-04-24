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
      let poem = response.data;
      console.log(poem);
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
