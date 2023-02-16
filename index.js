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

/*********************************************************/
/*********** REQUETE CARACTERS ***************************/
/*********************************************************/

app.get("/Characters", async (req, res) => {
  // TRY CATCH EN CAS DE REQUETE KO
  try {
    // REQUETE POUR REQUETER PAR NOM
    // let name = "";
    // if (req.query.name) {
    //   name = req.query.name;
    // }

    // REQUETE VIA QUERY NAME
    const name = req.query.name || "";
    // SAUT DE PAGE SI > 100 ELEMENTS
    const skip = req.query.skip || "0";
    // NB D'ELEMENT PAR PAGE = 100
    const limit = req.query.limit || "100";

    // RECUPERATION DES DONNEES
    console.log(name);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`

      // VERIFICATION POSTMAN DE L'URL AVEC API KEY OK
      // `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=UDzeRv7FEZol1MLG`
    );
    // VERIFICATION : console.log(response.data);

    // RENVOI DU RESULTAT OU D'UN MESSAGE D'ERREUR
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/*********************************************************/
/*********** REQUETE COMICS ******************************/
/*********************************************************/

app.get("/Comics", async (req, res) => {
  // TRY CATCH EN CAS DE REQUETE KO
  try {
    // REQUETE VIA QUERY TITLE
    const title = req.query.title || "";
    // SAUT DE PAGE SI > 100 ELEMENTS
    const skip = req.query.skip || "0";
    // NB D'ELEMENT PAR PAGE = 100
    const limit = req.query.limit || "100";

    // RECUPERATION DES DONNEES
    console.log(title);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${title}&skip=${skip}&limit=${limit}`

      // VERIFICATION POSTMAN DE L'URL AVEC API KEY OK
      // `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=UDzeRv7FEZol1MLG`
    );
    // VERIFICATION : console.log(response.data);

    // RENVOI DU RESULTAT OU D'UN MESSAGE D'ERREUR
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

// PORT INDIQUE DANS .ENV ET PAR DEFAUT 4000
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server has started`);
});
