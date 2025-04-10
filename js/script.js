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

  displayCorner();
});

showDialog.addEventListener("click", () => {
  dialog.showModal();
});

function displayCorner() {
  list.innerHTML = "";

  corner.forEach((poem) => {
    let poemCard = document.createElement("div");
    poemCard.classList.add("poem-card");

    let poemContent = document.createElement("div");
    poemContent.classList.add("poem-content");

    let title = document.createElement("h3");
    title.textContent = poem.title;

    let genre = document.createElement("p");
    genre.textContent = `Genre: ${poem.genre}`;

    let buttons = document.createElement("div");
    buttons.classList.add("poem-buttons");

    let del = document.createElement("button");
    del.innerHTML = "Delete";
    del.addEventListener("click", () => {
      poemCard.remove();
      let index = corner.indexOf(poem);
      corner.splice(index, 1);
      localStorage.setItem("corner", JSON.stringify(corner));

      displayCorner();
    });
    let edit = document.createElement("button");
    edit.innerHTML = "Edit";
    edit.addEventListener("click", () => {
      let newTitle = prompt("Enter new title", poem.title);
      let newGenre = prompt("Enter new genre", poem.genre);

      poem.title = newTitle;
      poem.genre = newGenre;

      localStorage.setItem("corner", JSON.stringify(corner));
      displayCorner();
    });

    buttons.append(del, edit);
    poemContent.append(title, genre);
    poemCard.append(poemContent, buttons);
    list.appendChild(poemCard);
  });
}
