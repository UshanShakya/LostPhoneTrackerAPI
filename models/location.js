var database = require('../database/database');

const Location = database.sequelize.define('Location',{
    locationId:{
        type:database.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    latitude:{
        type: database.Sequelize.DOUBLE,
        allowNull: false

    },
    longitude: {
        type: database.Sequelize.DOUBLE,
        allowNull: false
    },
    userId: {
        type: database.Sequelize.STRING,
        allowNull: false
    }  
},
{
    freezeTableName: false,
    tableName:'Location'
},

);
Location.sync({force: false})
.then(function(result){
    console.log(result);
    //  next();
})
.catch(function(err){
    console.log(err);
});

module.exports={
    Location
}

