//DEPENDANCES UTILISEES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// ATTENTION .v2
const cloudinary = require("cloudinary").v2;
// ACTIVE VARIABLES D'ENVIRONNEMENT DANS .env
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//CONNEXION À BASE DE DONNEE
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

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
// app.get("/", (req, res) => {
//   res.json("Bienvenue sur mon serveur");
// });

app.all("*", (req, res) => {
  res.status(404).json({ message: "This routes doesn't exist" });
});
// PORT PAR DEFAUT INDIQUE DANS .ENV
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
