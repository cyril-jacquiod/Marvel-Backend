// Le site que tu fais doit respecter les fonctionnalités listées dans l'énoncée.

// Ton front doit contenir 3 pages, par exemple une page qui liste les personnages de marvel. Pour avoir la liste des personnages de marvel, il faut faire une requête à l'API de la documentation.
// Ces requêtes doivent contenir l'API key, qui est censée être secrète, donc on ne peut pas faire les requêtes à l'API depuis le front directement car on ne peut pas cacher d'information en front.

// On doit, donc, créer un backend intermédiaire.
// Notre front va faire une requête au backend intermédiaire, qui va faire une requête à l'API en envoyant l'api_key.
// Cette dernière va répondre au backend intermédiaire qui va répondre au front.
// ACTIVE VARIABLES D'ENVIRONNEMENT DANS .env
require("dotenv").config();

//DEPENDANCES UTILISEES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = express.Router();

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

    console / log(name);
    const response = await axios.get(
      "/https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=UDzeRv7FEZol1MLG"
    );
    // VERIFICATION AVEC console.log(response.data);

    // STOCKAGE DU RESULTAT DANS DATA
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// CETTE REQUETE : AUCUN RESULTAT
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);
// CETTE REQUETE : LISTE DES CHARACTERES
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&",
  (req, res) => {
    res.send("Hello");
  }
);
// CETTE REQUETE : INFO SUR UN CHARACTERE
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/character/5fcf91f4d8a2480017b91453?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);

// PORT INDIQUE DANS .ENV ET PAR DEFAUT 4000
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server has started`);
});
