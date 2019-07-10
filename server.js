var express = require('express');
var android = express();
var bodyParser = require('body-parser');

var multer = require('multer');
var path = require('path');


var userController = require('./controllers/userController.js');
var locationController = require('./controllers/locationController.js');
var AuthController = require('./controllers/AuthController.js');


android.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
    next();
});


var storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 1000000 }
});

var publicDir = require('path').join(__filename,'/uploads');
 android.use(express.static(publicDir));

 android.use(express.static('public'));

 //Serves all the request which includes /images in the url from Images folder
android.use('/uploads', express.static(__dirname + '/uploads'));

android.post('/v1/uploads',upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });



android.use(bodyParser.json());


android.post('/v1/register',userController.validator, userController.hashGenerator, userController.registerUser, function(req, res){
    res.status(200);
    res.send({"message":"User registered sucessfully"})
});

android.get('/v1/getUsers/:userId',userController.getUsers,function(req, res){
   
});


android.put('/v1/updateUser/:userId',userController.validator,userController.hashGenerator,userController.updateUser,function(req,res,next){
});

android.post('/v1/additem', locationController.addLocation,function(req,res){
    res.status(200);
    res.send({"message":"Item registered sucessfully"})

});

android.get('/v1/getItems/:userId',locationController.getLocation,function(req, res){
    res.status(200).json(req.body);
});

android.delete('/v1/deleteUser/:userId',userController.deleteUser, function(req, res){
});

android.post('/v1/login',AuthController.verify,AuthController.check,AuthController.jwtTokenGen,AuthController.sendUserData,
 function(req,res){
   
})

android.use(function(err, req, res, next){
   console.log(err);
   console.log(err.message);
   
    res.status(err.status);
   res.send({"message":err.message});
});

android.listen(3001);
