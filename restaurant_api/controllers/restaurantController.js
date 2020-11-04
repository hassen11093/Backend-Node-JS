const Restaurant = require('../model/restaurant');
const fs = require('fs');
const jwt= require ('jsonwebtoken');
const axios = require ('axios');

//Getting all the product !
exports.getAllRestaurants = (req, res, next) => {
  
  Restaurant.find().then(
      (restaurants) => {
        res.status(200).json(restaurants);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

//addition of a product 
exports.addRestaurant = (req, res, next) => {
    
    var body=JSON.parse(req.body.body)
    var restaurant = new Restaurant({
      userId: body.userId,
      name: body.name,
      location: JSON.parse(body.location) ,
      contact_email: body.contact_email,
      restaurant_image: req.file.filename,
      type: body.type,
      status: body.status  
    });
    restaurant.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  


//getting one product by ID 
  exports.getOneRestaurant = (req, res, next) => {
    Restaurant.findOne({
      _id: req.params.id
    }).then(
      (restaurant) => {
        res.status(200).json(restaurant);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };


//modify a product by its ID 
  exports.modifyRestaurant = (req, res, next) => {
    var body=JSON.parse(req.body.body)
    let data = body;
    const restaurantObject = 
      {
      userId: body.userId,
      name: body.name,
      location: body.location ,
      contact_email: body.contact_email,
      
      type: body.type,
      status: body.status 
      };

      if(req.file)
        restaurantObject.restaurant_image = req.file.filename;      
      Restaurant.findOne({ _id: req.params.id })
      .then(restaurant => {
        const filename = restaurant.restaurant_image;
        fs.unlink(`images/${filename}`, () => {
            
          });
      })
      .catch(error => res.status(500).json({ error }));
      
    Restaurant.updateOne({ _id: req.params.id }, { ...restaurantObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };





  exports.deleteRestaurant = (req, res, next) => {
    Restaurant.findOne({ _id: req.params.id })
      .then(restaurant => {
        const filename = restaurant.restaurant_image;
        fs.unlink(`images/${filename}`, () => {
          Restaurant.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };