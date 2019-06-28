var userModel = require('../models/users');
var bcrypt = require('bcrypt');
var saltRounds = 10;


function hashGenerator(req, res, next){
    bcrypt.hash(req.body.password, saltRounds)
    .then(function(hash){
        console.log(hash);
        req.hashValue= hash;
        next();

    })
    .catch(function(err){
        next({"message":"Password hash error"});
    })
}
function validator(req,res,next){
    userModel.User.findOne({
        where:{username:req.body.username}
    })
    //user have been rergistered
    .then(function(result){
        if (result.dataValues != '')
		next({"status":409,"message":"user already exists"})
           
    })
    .catch(function(err){
        // next({"status":409 ,"message":err});
        next(``)
    })
    
    }

function registerUser(req, res, next){
  
        userModel.User.create({
        userFname: req.body.userFname,
        userLname: req.body.userLname,
        username: req.body.username,
        password: req.hashValue
    })
    
.then(function(result){
    console.log(result);
    next();
})
.catch(function(err){
   
    next({"status":500, "message":"Database Error."})
});

}

function getUsers (req, res,next){
    userModel.User.findAll({
        attributes: ["userId","userFname","userLname","username","password"]
    })
    .then(function(result){
        res.send(result)
        next();
    })
    .catch(function(err){
        next(err);
        // console.log(err);
    })
}

module.exports={
    registerUser,
    getUsers,
    hashGenerator,
    validator
}