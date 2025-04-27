// we need to get the poem id from the url of the database
let urlParam = new URLSearchParams(window.location.search);
let poemId = urlParam.get("id");

//Grab DOM elements by their selectors
let title = document.querySelector("#poem-title");
let date = document.querySelector("#poem-date");
let content = document.querySelector("#poem-body");
let author = document.querySelector("#poem-author");

// Put our API key and url in a variable
let url = "https://hdskyldktgkkeymviafa.supabase.co";
let apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc2t5bGRrdGdra2V5bXZpYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MDAxNDcsImV4cCI6MjA2MTA3NjE0N30.zUrzNnv8k2spU-9XCwM4-wC7HG0sKLsejXyX4KPgjLw";

fetchPoem();

async function fetchPoem() {
  try {
    let response = await axios.get(`${url}/rest/v1/poems?id=eq.${poemId}`, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    });

    let poem = response.data[0];
    console.log(poem);
    title.textContent = poem.title;
    date.textContent = `Uploaded: ${poem.creation_date}`;
    content.innerHTML = `${poem.body.replace(/\\n/g, "\n")}`;

    author.textContent = poem.author;
  } catch (error) {
    console.error("Error fetching poem:", error);
  }
}
