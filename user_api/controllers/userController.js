const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        password: hash,
        phonenumber: req.body.phonenumber,
        role: req.body.role
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log("dkfjd");
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            role:user.role,
            token: jwt.sign(
              { userId: user._id,userRole: user.role},
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



exports.getAllUsers = (req, res, next) => {
    User.find().then(
      (users) => {
        res.status(200).json(users);
        console.log("yessssssssssssssssss",users);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


  exports.getOneUser = (req, res, next) => {
    User.findOne({
      _id: req.params.id
    }).then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
 

  exports.deleteUser = (req, res, next) => {
          User.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'User Deleted !'}))
            .catch(error => res.status(400).json({ error }));
     
  };