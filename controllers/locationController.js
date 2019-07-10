var locationModel = require('../models/location');

function addLocation(req,res,next){


    locationModel.Location.create({
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        userId:req.body.username,
        })
    .then(function(result){
        // console.log(result);
        next();
    })
    .catch(function(err){
        next({"status":500, "message":"Database Error."})
    });
}

function getLocation(req, res, next){
    // console.log('i am here')
    // res.send({"message":"here"});
    // next();
    // console.log(req.params.userId);
    locationModel.Location.findOne({
        attributes: ["locationId","latitude","longitude","userId"]
        ,
	where:{
	userId:req.params.userId},
	order: [ [ 'createdAt', 'DESC' ]]

    })
    .then(function(result){
        res.json(result);
        next();
    })
    .catch(function(err){
        next({"status":"500","message":"Error"});
        // console.log(err);
    })
}

module.exports={
   addLocation,getLocation
}
