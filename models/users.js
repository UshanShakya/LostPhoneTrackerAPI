var database = require('../database/database');

const User = database.sequelize.define('User',{
    userId:{
        type:database.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    userFname:{
        type: database.Sequelize.STRING,
        allowNull: false

    },

    userLname:{
        type: database.Sequelize.STRING,
        allowNull: false

    },
    username: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
},
{
    freezeTableName: false,
    tableName:'User'
}

);

User.sync({force: false})
.then(function(result){
console.log(result);

})
.catch(function(err){
    console.log(err);
});

module.exports={
    User
};