const bcrypt = require("bcrypt");
const jwt = require('jsonwebtokens');
const models = require('../models');
const asyncLib  = require('async');

const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

module.exports = {
    signup: function (request, response){
        let first_name= request.body.first_name;
        let last_name= request.body.last_name;
        let email= request.body.email;
        let password= request.body.password;
        let role= request.body.role;


        if( email == null|| first_name == null|| last_name == null || password == null){
            return response.status(400).json({ error : "champs manquants"});
        }

        if (!EMAIL_REGEX.test(email)) {
            return response.status(400).json({ error: "email n'est pas valide" });
        }
            
        if (!PASSWORD_REGEX.test(password)) {
            return response.status(400).json({ error: 'mot de passe invalide (longueur entre 4 et 8 caractères, avec un chiffre obligatoire)' });
        }

        asyncLib.waterfall([
            function(done) {
              models.User.findOne({
                attributes: ['email'],
                where: { email: email }
              })
              .then(function(userFound) {
                done(null, userFound);
              })
              .catch(function(err) {
                return response.status(500).json({ error: "impossible de vérifier l'utilisateur" });
              });
            },
            function(userFound, done) {
              if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                  done(null, userFound, bcryptedPassword);
                });
              } else {
                return response.status(409).json({ error: "cet utilisateur existe déjà" });
              }
            },
            function(userFound, bcryptedPassword, done) {
              var newUser = models.User.create({
                first_name : first_name,
                last_name : last_name,
                email: email,
                password: bcryptedPassword,
                role: role
              })
              .then(function(newUser) {
                done(newUser);
              })
              .catch(function(err) {
                return response.status(500).json({ error: "impossible de créer cet utilisateur" });
              });
            }
          ], function(newUser) {
            if (newUser) {
              return response.status(201).json({
                'userId': newUser.id
              });
            } else {
              return response.status(500).json({ 'error': 'impossible de créer cet utilisateur' });
            }
          });
        
    }
}

