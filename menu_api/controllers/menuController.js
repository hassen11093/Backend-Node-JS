const Menu = require('../model/menu');
const fs = require('fs');
const jwt= require ('jsonwebtoken');
const axios = require ('axios');

//Getting all the product !
exports.getAllMenus = (req, res, next) => {
  
  Menu.find().then(
      (menus) => {
        res.status(200).json(menus);
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
exports.addMenu = (req, res, next) => {
    console.log(req.body)
    //var body=JSON.parse(req.body.body)
    var menu = new Menu({
      restaurantId:req.body.restaurantId,
      name:req.body.name,
      categories:req.body.categories,
      image:req.file.filename
    });
    menu.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  


//getting one product by ID 
  exports.getOneMenu = (req, res, next) => {
    Menu.findOne({
      _id: req.params.id
    }).then(
      (menu) => {
        res.status(200).json(menu);
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
  exports.modifyMenu = (req, res, next) => {
    //var body=JSON.parse(req.body.body)
    //let data = body;
    const menutObject = 
      {
        restaurantId:req.body.restaurantId,
        name:req.body.name,
        categories:req.body.categories,
        image:req.file.filename
      };

      if(req.file)
        menutObject.image = req.file.filename;      
      Menu.findOne({ _id: req.params.id })
      .then(menu => {
        const filename = menu.image;
        fs.unlink(`images/${filename}`, () => {
            
          });
      })
      .catch(error => res.status(500).json({ error }));
      
    Menu.updateOne({ _id: req.params.id }, { ...menutObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };





  exports.deleteMenu = (req, res, next) => {
    Menu.findOne({ _id: req.params.id })
      .then(menu => {
        const filename = menu.image;
        fs.unlink(`images/${filename}`, () => {
          Menu.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };