let dialog = document.querySelector("dialog");
let form = document.querySelector("#newPoem");
let showDialog = document.querySelector("#showDialog");

let list = document.querySelector(".poetry-list");

let corner = JSON.parse(localStorage.getItem("corner")) || [];

displayCorner(); // display when the page loads

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.querySelector("#title");
  let genre = document.querySelector("#data-category");
  let date = document.querySelector("#date");

  let newPoem = {
    title: title.value,
    genre: genre.value,
    date: date.value,
  };

  corner.push(newPoem);
  localStorage.setItem("corner", JSON.stringify(corner));

  dialog.close();
  form.reset();
});

showDialog.addEventListener("click", () => {
  dialog.showModal();
});

function displayCorner() {
  list.innerHTML = "";

  corner.forEach((poem) => {
    let poemCard = document.createElement("div");
    poemCard.classList.add("poem-card");

    let title = document.createElement("h3");
    title.textContent = poem.title;

    let genre = document.createElement("p");
    genre.textContent = `Genre: ${poem.genre}`;

    poemCard.append(title, genre);
    list.appendChild(poemCard);
  });
}
