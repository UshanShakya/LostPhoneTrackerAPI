var userModel = require('../models/users');
var bcrypt = require('bcrypt');

function verify (req,res,next){
	userModel.User.findOne({
		where:{username : req.body.username}
	})
	.then(function(result){
		// store the user's hash password obtained from database in a variable and pass it through req object
req.userHashPassword = result.dataValues.password
	next();

	})
	//display error if username is not found database
	.catch(function(err){
next({"status":400 , "message": "please register first"})

	})
}

	function check(req,res,next){
 // comapre's first parameter password obtained from login form i.e. req.body.password
 // second parameter the value passed from previous function (from database) through req object
bcrypt.compare(req.body.password,req.userHashPassword)
.then(function(result){
	next();
 
})
.catch(function(err){
	next({"status":400, "message" : "Password Doesnot match"})
})
}


module.exports ={

    verify,
    check
}