const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    // console.log(req.body);
    // return res.json(req.body);
    const { email, username, description } = req.body;

    // Vérifier qu'on a bien reçu toutes les infos
    if (!email || !username || !description) {
      return res
        .status(400)
        .json({ message: "Please send an email a username and a description" });
    }

    // Vérifier si l'email n'est pas utilisé
    // Je veux aller chercher dans ma BDD un utilisateur ayant pour email, la variable email. Si j'en trouve un, je renvoie une erreur, sinon, je continue
    const emailAlreadyUsed = await User.findOne({ email: email });
    // console.log(emailAlreadyUsed);
    if (emailAlreadyUsed) {
      return res.status(409).json({ message: "This email is already used" });
    }
    // Vérifier si le username n'est pas utilisé
    // Je veux aller chercher dans ma BDD un utilisateur ayant pour username, la variable username. Si j'en trouve un, je renvoie une erreur, sinon, je continue
    const usernameAlreadyUsed = await User.findOne({ username: username });
    if (usernameAlreadyUsed) {
      return res.status(409).json({ message: "This username is already used" });
    }
    //1
    const newUser = new User({
      email: email,
      username: username,
      description: description,
    });

    //2
    await newUser.save();

    //3
    res.json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

module.exports = router;
