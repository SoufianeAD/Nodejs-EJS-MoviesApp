const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const User = sequelize.define('user', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName : Sequelize.STRING,
    lastName : Sequelize.STRING,
    email : Sequelize.STRING,
    password : Sequelize.STRING,
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    imgUrl: Sequelize.STRING,
});

module.exports = User;