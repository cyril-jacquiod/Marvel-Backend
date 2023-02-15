// Le site que tu fais doit respecter les fonctionnalités listées dans l'énoncée.

// Ton front doit contenir 3 pages, par exemple une page qui liste les personnages de marvel. Pour avoir la liste des personnages de marvel, il faut faire une requête à l'API de la documentation.
// Ces requêtes doivent contenir l'API key, qui est censée être secrète, donc on ne peut pas faire les requêtes à l'API depuis le front directement car on ne peut pas cacher d'information en front.

// On doit, donc, créer un backend intermédiaire.
// Notre front va faire une requête au backend intermédiaire, qui va faire une requête à l'API en envoyant l'api_key.
// Cette dernière va répondre au backend intermédiaire qui va répondre au front.

//DEPENDANCES UTILISEES
const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
// ATTENTION .v2
const cloudinary = require("cloudinary").v2;
// ACTIVE VARIABLES D'ENVIRONNEMENT DANS .env
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//CONNEXION À BASE DE DONNEE
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// ROUTES
// const userRoutes = require("./routes/user");
// const offerRoutes = require("./routes/offer");
// app.use(userRoutes);
// app.use(offerRoutes);

// ROUTE DE BIENVENUE

app.get(
  "/https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);

// PORT PAR DEFAUT INDIQUE DANS .ENV
app.listen(3000, () => {
  console.log("Server started");
});
