const express = require("express");
const router = express.Router();
// ROUTES
const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    // RETOUR DE LA REQUE return res.json(req.body);
    const { email, username, description } = req.body;

    // VERIFICATION BONNE RECEPTION
    if (!email || !username || !description) {
      return res
        .status(400)
        .json({ message: "Please send an email a username and a description" });
    }

    // CONTROLE MAIL BDD : SI PRESENT ALORS "ERREUR" SINON "JE CONTINUE"
    const emailAlreadyUsed = await User.findOne({ email: email });
    // VERIFICATION : console.log(emailAlreadyUsed);
    if (emailAlreadyUsed) {
      return res.status(409).json({ message: "This email is already used" });
    }
    // CONTROLE MAIL USERNAME : SI PRESENT ALORS "ERREUR" SINON "JE CONTINUE"
    const usernameAlreadyUsed = await User.findOne({ username: username });
    if (usernameAlreadyUsed) {
      return res.status(409).json({ message: "This username is already used" });
    }
    // ETAPE 1
    const newUser = new User({
      email: email,
      username: username,
      description: description,
    });

    // ETAPE 2
    await newUser.save();

    // ETAPE 3
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
