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
		next({"status":409,"message":"User Already Exists"})
           
    })
    .catch(function(err){
        // next({"status":409 ,"message":err});
        next(``)
    })
}
    

function registerUser(req, res, next){
    // console.log(req);
  
    
        userModel.User.create({
        userFname: req.body.userFname,
        userLname: req.body.userLname,
        username: req.body.username,
        password: req.hashValue,
        image:req.body.image
    })
    
.then(function(result){
    // console.log(result);
    next();
})
.catch(function(err){
   
    next({"status":500, "message":"Database Error."})
});

}

function getUsers (req, res,next){
    userModel.User.findOne({
        where:{userId:req.params.userId},
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
};

function updateUser(req, res, next){
    userModel.User.update({
        userFname: req.body.userFname,
        userLname: req.body.userLname,
        username: req.body.username,
        password: req.hashValue,
        image:req.body.image
    },
    {
        where:{
        userId:req.params.userId
    }
    })
    
    .then(function(result){
        res.status(201);
    res.send({"message":"Updated Successfully"});
    next();
    })
    .catch(function(err){
    
    next({"status":500, "message":"Database Error."})
    });
}

function deleteUser(req, res, next){
    userModel.User.destroy({
        where : {userId:req.params.userId}
    })
    .then(function(){
        res.send({"status":200,"message":"Deleted"});
        
    })
    .catch(function(err){
        next({"status":"500","message":"Cannot get from database "})
    })
}
module.exports={
    registerUser,
    getUsers,
    deleteUser,
    updateUser,
    hashGenerator,
    validator
}
