const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    nom_user:req.body.nom_user,
    prenom_user:req.body.prenom_user,
    organisation: req.body.organisation,
    email_user: req.body.email_user,
    password_user: bcrypt.hashSync(req.body.password_user, 10)
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email_user: req.body.email_user
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur inexistant." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password_user,
        user.password_user
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrect!"
        });
      }

      var token = jwt.sign({ id: user.id_user }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user.id_user,
        nom_user: user.nom_user,
        prenom_user: user.prenom_user,
        email_user: user.email_user,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
