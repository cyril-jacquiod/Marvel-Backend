const express = require("express");
const router = express.Router();
// ROUTES
const User = require("../models/User");


router.post("/User/SignUp", async (req, res) => {
  try {
    // RETOUR DE LA REQUETE BDD return res.json(req.body);
    const { email, username, password } = req.body;

    // VERIFICATION BONNE RECEPTION
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Please send an email a username and a description" });
    }

    // CONTROLE MAIL BDD : SI PRESENT ALORS "ERREUR" SINON "JE CONTINUE"
    const emailExist = await User.findOne({ email: email });
    // VERIFICATION : console.log(emailAlreadyUsed);
    if (emailExist) {
      return res.status(409).json({ message: "This email is already used" });
    }
    // CONTROLE MAIL USERNAME : SI PRESENT ALORS "ERREUR" SINON "JE CONTINUE"
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(409).json({ message: "This username is already used" });
    }
    // ETAPE 1
    const newUser = new User({
      email: email,
      username: username,
      description: password,
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

router.get("/User", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
});

module.exports = router;
