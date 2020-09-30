module.exports = (sequelize, Sequelize) => {
    const ResetToken = sequelize.define("resetToken", {
        email: {
            type: Sequelize.STRING
          },
          token: {
            type: Sequelize.STRING
          },
          expiration: {
            type: Sequelize.DATE
          },
          used: {
            type: Sequelize.INTEGER
          }
    });
  
    return ResetToken;
  };