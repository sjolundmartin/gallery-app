import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getPhotos, getPhoto } from "./imageApi.js";

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
  getPhotos().then((photos) => {
    res.render("home", { title: "Gallery App", photos: photos });
  });
});

app.get("/about", (req, res) => {
  res.render("about", { header: "About" });
});

// Start server
app.listen("8000", () => {
  console.log("Server started on port 8000");
});
