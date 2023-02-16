// ACTIVE VARIABLES D'ENVIRONNEMENT DANS .env
require("dotenv").config();

//DEPENDANCES UTILISEES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const axios = require("axios");

// JE CREE MON SERVEUR
const app = express();

// POUR UNE UTILISATION MULTI-NAVIGATEURS
app.use(cors());
// POUR QUE SERVEUR RECUPERE BODY
app.use(express.json());

app.use(morgan("dev"));

// CONNEXION À BASE DE DONNEE POUR INSCRIPTION AU SITE
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// DECLARATION DE FONCTION FAISANT LA REQUETE VIA UNE AUTRE FONCTION (FCT USEEFFECT PAS ASYNC)
app.get("/Characters", async (req, res) => {
  // TRY CATCH EN CAS DE REQUETE KO
  try {
    // REQUETE POUR AFFICHAGE PAGE
    // let name = "";
    // if (req.query.name) {
    //   name = req.query.name;
    // }

    // RECUPERATION DU DATA VIA QUERY NAME
    const name = req.query.name || "";
    // SAUT DE PAGE SI ELEMENT = 100
    const skip = req.query.skip || "0";
    // NB D'ELEMENT PAR PAGE = 100
    const limit = req.query.limit || "100";

    // CETTE REQUETE : LISTE DES CHARACTERS
    console.log(name);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
    );
    // VERIFICATION AVEC
    console.log(response.data);

    // STOCKAGE DU RESULTAT DANS DATA
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// // CETTE REQUETE : AUCUN RESULTAT
// app.get(
//   "https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=UDzeRv7FEZol1MLG",
//   (req, res) => {
//     res.send("Hello");
//   }
// );
// // CETTE REQUETE : LISTE DES CHARACTERS
// app.get(
//   "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&",
//   (req, res) => {
//     res.send("Hello");
//   }
// );
// CETTE REQUETE : INFO SUR UN CHARACTERE
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

// PORT INDIQUE DANS .ENV ET PAR DEFAUT 4000
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server has started`);
});
