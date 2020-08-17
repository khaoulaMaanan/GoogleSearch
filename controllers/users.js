var db = require('../db_connection');
var bcrypt = require('bcrypt');

var userModel = {
    createUser : function (user,callback) {
        return db.con.query("INSERT INTO user (nom_user,prenom_user,organisation,email_user,password_user) VALUES (?,?,?,?,?)",[user.nom_user,user.prenom_user,user.organisation,user.email_user, bcrypt.hashSync(user.password_user,10)],callback);
    },
    authenticate: function (email, password, callback) {
        return db.con.query("SELECT * FROM user WHERE email_user=? limit 1", [email.trim()], function (err, rows) {
            if (rows && rows.length == 1 && bcrypt.compareSync(password, rows[0].password_user)) {
                callback(err, rows);
            } else {
                callback("not valid", null);
            }
        });
    }
}

module.exports = userModel;

/*var user1 ={
     nom_user : 'a',
    prenom_user : 'b',
    organisation :'ensias',
    email_user :'zbila@gmail.com',
    password_user :'1234'
};
user.authenticate('zbila@gmail.com',bcrypt.hashSync('1234',10),function(error,rows){
    if (error){
        return console.error(error.message);
    }
    console.log('sd9at'); 
});*/