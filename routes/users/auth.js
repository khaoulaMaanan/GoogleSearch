var express = require('express');
var router = express.Router();
var userModel = require('../../controllers/users');
var jwt = require('jsonwebtoken');



function register(req,res) {
    var user = req.body;

    userModel.createUser(user , function (err,rows) {
            if(err){
                res.status(400);
                res.json({ success: false, message: 'User creation failed'});
            }
            else{
                res.json({ success: true });
            }
        });
}


function authenticateUser(req, res) {
    if (typeof req.body.email !== 'undefined' && typeof req.body.password !== 'undefined') {
        var email_user = req.body.email.trim();
        var password_user = req.body.password.trim();
        userModel.authenticate(email_user, password_user, function (err, rows) {
            if (err || rows.length == 0) {
                res.status(400);
                res.json({success: false});
            } else {
                var token = jwt.sign({ email: rows[0].email_user, nom: rows[0].user_nom, _id: rows[0].user_id}, 'Trainly');
                rows[0]['token'] = token;
                res.json(JSON.parse(JSON.stringify(rows[0])));
            }
        });
    } else {
        res.status(400);
        res.json({success: false});
    }
}

router.post('/authenticate', authenticateUser);
router.post('/register', register);

module.exports=router;