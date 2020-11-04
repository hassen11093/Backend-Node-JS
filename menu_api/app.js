// import the require modules
const express = require('express');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menuRoutes');
const mongoose = require ('mongoose');
const path = require('path');
//const userRoutes = require('./routes/userRoutes');



//Mongo Connection 
mongoose.connect("mongodb://localhost:27017/healthyfood",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
      

const app = express();


//headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(path.join(__dirname, 'images'))); 
app.use('/api/menu', menuRoutes);
//app.use('/api/auth', userRoutes);


module.exports = app; 