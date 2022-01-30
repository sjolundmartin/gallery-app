import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Init app
const app = express();

// Load view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Set public folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
  res.render("home", { title: "Gallery App" });
});

app.get("/about", (req, res) => {
  res.render("about", { header: "About" });
});

// Start server
app.listen("8000", () => {
  console.log("Server started on port 8000");
});

const api_key = "2a8cf44357a719b5c5a67ef8134cb474";
const tag = "aurora";

const getImages = () => {
  fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tag}&format=json&nojsoncallback=1&auth_token=72157720831392943-b069951b54769074&api_sig=3d4c7a16d94d55b7a780756234d376fb`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
};

getImages();
