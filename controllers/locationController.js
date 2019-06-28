var locationModel = require('../models/location');

function addLocation(req,res,next){

    locationModel.Location.create({
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        userId:req.body.userId,
        })
    .then(function(result){
        console.log(result);
        next();
    })
    .catch(function(err){
        next({"status":500, "message":"Database Error."})
    });
}

function getLocation(req, res, next){
    itemModel.Item.findAll({
        attributes: ["locationId","latitude","longitude","userId"]
    })
    .then(function(result){
        res.send(result);
        next();
    })
    .catch(function(err){
        next({"status":"500","message":"get errors"});
        console.log(err);
    })
}

module.exports={
   addLocation,getLocation
}