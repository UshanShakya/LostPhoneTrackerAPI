var database = require('../database/database');

const Item = database.sequelize.define('Item',{
    locationId:{
        type:database.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    latitude:{
        type: database.Sequelize.STRING,
        allowNull: false

    },
    longitude: {
        type: database.Sequelize.STRING,
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
Item.sync({force: false})
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

