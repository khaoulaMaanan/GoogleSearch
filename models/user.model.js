module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
       id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
      nom_user: {
        type: Sequelize.STRING
      },
      prenom_user: {
        type: Sequelize.STRING
      },
      organisation: {
        type: Sequelize.STRING
      },
      email_user: {
        type: Sequelize.STRING
      },
      password_user: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };