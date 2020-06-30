const bcrypt    = require('bcrypt');
const models    = require('../models');
console.log(models)
// Constants

// Routes
module.exports = {
    signup: function(req, res) {
      console.log(req.body.email)
   
        const first_name= req.body.first_name;
        const last_name= req.body.last_name;
        const email= req.body.email;
        const password= req.body.password;
        const role= req.body.role;

        models.User.findOne({
          attributes: ['email'],
          where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
          
            bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
            const newUser = models.User.create({
            first_name : first_name,
            last_name : last_name,
            email: email,
            password: bcryptedPassword,
            role: role
        })
        .then(function(newUser) {
            return res.status(201).json({
                'userId': newUser.id
              })
        })
        .catch(function(err) {
          return res.status(500).json({  error: "impossible de créer cet utilisateur" });
        });
        });
    
        } else {
        return res.status(500).json({ error: 'impossible de créer cet utilisateur'  });
        }
    });
}
}


// const bcrypt    = require('bcrypt');
// // const jwtUtils  = require('../utils/jwt.utils');
// const models    = require('../models');
// const asyncLib  = require('async');

// // Constants
// const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

// // Routes
// module.exports = {
//   register: function(req, res) {
    
//     // Params
//     const first_name= req.body.first_name;
//     const last_name= req.body.last_name;
//     const email= req.body.email;
//     const password= req.body.password;
//     const role= req.body.role;

//     if (email == null || username == null || password == null) {
//       return res.status(400).json({ 'error': 'missing parameters' });
//     }

//     if (username.length >= 13 || username.length <= 4) {
//       return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
//     }

//     if (!EMAIL_REGEX.test(email)) {
//       return res.status(400).json({ 'error': 'email is not valid' });
//     }

//     if (!PASSWORD_REGEX.test(password)) {
//       return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
//     }

//     asyncLib.waterfall([
//       function(done) {
//         models.User.findOne({
//           attributes: ['email'],
//           where: { email: email }
//         })
//         .then(function(userFound) {
//           done(null, userFound);
//         })
//         .catch(function(err) {
//           return res.status(500).json({ 'error': 'unable to verify user' });
//         });
//       },
//       function(userFound, done) {
//         if (!userFound) {
//           bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
//             done(null, userFound, bcryptedPassword);
//           });
//         } else {
//           return res.status(409).json({ 'error': 'user already exist' });
//         }
//       },
//       function(userFound, bcryptedPassword, done) {
//         var newUser = models.User.create({
//           first_name : first_name,
//           last_name : last_name,
//           email: email,
//           password: bcryptedPassword,
//           role: role
//         })
//         .then(function(newUser) {
//           done(newUser);
//         })
//         .catch(function(err) {
//           return res.status(500).json({ 'error': 'cannot add user' });
//         });
//       }
//     ], function(newUser) {
//       if (newUser) {
//         return res.status(201).json({
//           'userId': newUser.id
//         });
//       } else {
//         return res.status(500).json({ 'error': 'cannot add user' });
//       }
//     });
//   }
// }