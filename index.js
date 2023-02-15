// Le site que tu fais doit respecter les fonctionnalités listées dans l'énoncée.

// Ton front doit contenir 3 pages, par exemple une page qui liste les personnages de marvel. Pour avoir la liste des personnages de marvel, il faut faire une requête à l'API de la documentation.
// Ces requêtes doivent contenir l'API key, qui est censée être secrète, donc on ne peut pas faire les requêtes à l'API depuis le front directement car on ne peut pas cacher d'information en front.

// On doit, donc, créer un backend intermédiaire.
// Notre front va faire une requête au backend intermédiaire, qui va faire une requête à l'API en envoyant l'api_key.
// Cette dernière va répondre au backend intermédiaire qui va répondre au front.

// BESOIN DE STATE
import React, { useState, useEffect } from "react";
// BESOIN DE REQUETE AXIOS (GET)
import axios from "axios";

//DEPENDANCES UTILISEES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ACTIVE VARIABLES D'ENVIRONNEMENT DANS .env
// require("dotenv").config();

// JE CREE MON SERVEUR
const app = express();
// POUR UNE UTILISATION MULTI-NAVIGATEURS
app.use(cors());
// POUR QUE SERVEUR RECUPERE BODY
app.use(express.json());

// CONNEXION À BASE DE DONNEE
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGODB_URI);

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// ROUTES
// const userRoutes = require("./routes/user");
// const offerRoutes = require("./routes/offer");
// app.use(userRoutes);
// app.use(offerRoutes);

// STATE DE RECUPERATION DU DATA
const [data, setData] = useState();
// STATE PERMETTANT DE SAVOIR SI DATA RECUPERE
const [isLoading, setIsLoading] = useState(true);

// CETTE REQUETE : LISTE DES COMICS "THUMBNAIL"
useEffect(() => {
  // DECLARATION DE FONCTION FAISANT LA REQUETE VIA UNE AUTRE FONCTION (FCT USEEFFECT PAS ASYNC)
  const fetchData = async () => {
    // TRY CATCH EN CAS DE REQUETE KO
    try {
      // DECLARATION DE LA VARIABLE RESPONSE AVEC CLE RECHERCHE TITLE FONCTIONNE PAS
      const response = await axios.get(
        "/https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=UDzeRv7FEZol1MLG"
      );
      // VERIFICATION AVEC console.log(response.data);

      // STOCKAGE DU RESULTAT DANS DATA
      setData(response.data);
      // METTRE ISLOADING A FALSE
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  // APPEL DE LA FONCTION
  fetchData();
}, []);
// MESSAGE DE TELECHARGEMENT
return isLoading ? (
  <p>Loading ...</p>
) : (
  <div>
    {/* // UTILISATION D'UN TABLEAU POUR RECUPERER LES DATAS */}
    {data.results.map((results) => {
      // RECUPERATION DES OFFRES PAR ID
      return <Comics results={results} key={results._id} />;
    })}
  </div>
);
// CETTE REQUETE : AUCUN RESULTAT
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=UDzeRv7FEZol1MLG",
  (req, res) => {
    res.send("Hello");
  }
);
// CETTE REQUETE : LISTE DES CHARACTERES
app.get(
  "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=UDzeRv7FEZol1MLG",
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

// PORT PAR DEFAUT INDIQUE DANS .ENV
app.listen(4000, () => {
  console.log("Server started");
});
