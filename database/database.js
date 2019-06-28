var Sequelize = require('sequelize');

var sequelize = new Sequelize('Android', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    logging:false
  });
  
  sequelize.authenticate()
  .then(function(){
      console.log('db created successfully!');
  })
  .catch(function(err){
   console.log(err);
  });
  
  module.exports={
      Sequelize,
      sequelize
  }
