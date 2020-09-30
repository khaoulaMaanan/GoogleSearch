var express = require('express');
var bcrypt = require("bcrypt");
var crypto = require('crypto');
var router = express.Router();
var jwt = require('jsonwebtoken');
const db = require("../models");
const Sequelize = require('sequelize');
const User = db.user;
const ResetToken = db.ResetToken;

const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');


router.post('/forgot-password', async function(req, res, next) {
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'votre adresse email', 
    pass: 'mot de passe', 
  },
});
    //ensure that you have a user with this email
    var email = await User.findOne({where: { email_user: req.body.email_user }});
    if (email == null) {
    /**
     * we don't want to tell attackers that an
     * email doesn't exist, because that will let
     * them use this form to find ones that do
     * exist.
     **/
      return res.json({status: 'ok'});
    }
    /**
     * Expire any tokens that were previously
     * set for this user. That prevents old tokens
     * from being used.
     **/
    await ResetToken.update({
        used: 1
      },
      {
        where: {
          email: req.body.email_user
        }
    });
   
    //Create a random reset token
    var fpSalt = crypto.randomBytes(64).toString('base64');
   
    //token expires after one hour
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1/24);
   
    //insert token data into DB
    await ResetToken.create({
      email: req.body.email_user,
      expiration: expireDate,
      token: fpSalt,
      used: 0
    });
   
    //create email
    const message = {
        from: 'khaoulamaanan@gmail.com',
        to: req.body.email_user,
        subject: 'Réinitialisation de mot de passe',
        text: 'Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.\n\nhttp://localhost:4200/#/api/reset-password?token='+encodeURIComponent(fpSalt)+'&email_user='+req.body.email_user
    };
   
    //send email
    transport.sendMail(message, function (err, info) {
       if(err) { console.log(err)}
       else { console.log(info); }
    });
   
    return res.json({status: 'ok'});
  });

  router.get('/reset-password', async function(req, res, next) {
    /**
     * This code clears all expired tokens. You
     * should move this to a cronjob if you have a
     * big site. We just include this in here as a
     * demonstration.
     **/
    await ResetToken.destroy({
      where: {
        expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
      }
    });
   
    //find the token
    var record = await ResetToken.findOne({
      where: {
        email: req.query.email_user,
        expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
        token: req.query.token,
        used: 0
      }
    });
   
   
    /*res.render('user/reset-password', {
      record: record
    });*/
 });

  router.post('/reset-password', async function(req, res, next) {
    //compare passwords
    if (req.body.password1 !== req.body.password2) {
      return res.json({status: 'error', message: 'Les deux mots de passe ne sont pas identiques. Veuillez essayer une autre fois'});
    }
    var token_dec = decodeURIComponent(req.query.token);
    console.log(req.query.email_user);
   
    var record = await ResetToken.findOne({
      where: {
        email: req.query.email_user,
        expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
        token: token_dec,
        used: 0
      }
    });
    if (record == null) {
      return res.json({status: 'error', message: 'Ce lien a expiré.Veuillez essayer une autre fois'});
    }
   
    var upd = await ResetToken.update({
        used: 1
      },
      {
        where: {
          email: req.query.email_user
        }
    });
   
    //var newSalt = crypto.randomBytes(64).toString('hex');
    //var newPassword = crypto.pbkdf2Sync(req.body.password1, newSalt, 10000, 64, 'sha512').toString('base64');
   
    await User.update({
      password_user: bcrypt.hashSync(req.body.password1, 10),
      //salt: newSalt
    },
    {
      where: {
        email_user: req.query.email_user
      }
    });
   
    return res.json({status: 'ok', message: 'Mot de passe réinitialisé ! Connectez-vous aec votre nouveau mot de passe'});
  });

  module.exports=router;