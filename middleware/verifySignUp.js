const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
      where: {
        email_user: req.body.email_user
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Cette adresse email est déjà utilisée!"
        });
        return;
      }

      next();
    });
};
const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;
