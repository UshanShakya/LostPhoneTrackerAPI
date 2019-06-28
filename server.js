var express = require('express');
var android = express();
var bodyParser = require('body-parser');
var userController = require('./controllers/userController.js');
var locationController = require('./controllers/locationController');
var AuthController = require('./controllers/AuthController.js');


android.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});

android.use(bodyParser.json());


android.post('/v1/register',userController.validator, userController.hashGenerator, userController.registerUser, function(req, res){
    res.status(200);
    res.send({"message":"User registered sucessfully"})
});

android.get('/v1/getUsers',userController.getUsers,function(req, res){
    res.status(200).json(req.body);
});

android.post('/v1/additem', locationController.addLocation,function(req,res){
    res.status(200);
    res.send({"message":"Item registered sucessfully"})

});

android.get('/v1/getItems',locationController.getLocation,function(req, res){
    res.status(200).json(req.body);
});

android.post('/v1/login',AuthController.verify,AuthController.check, function(req,res){
    res.status(200);
    res.send({"message":"Logged in sucessfully"})
})

android.use(function(err, req, res, next){
   console.log(err.status);
   console.log(err.message);
   
    res.status(err.status);
   res.send({"message":err.message});
});

android.listen(3001);