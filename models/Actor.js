const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const Actor = sequelize.define('actor', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName : Sequelize.STRING,
    lastName : Sequelize.STRING,
    dateOfBirth: Sequelize.DATEONLY,
    imgUrl: Sequelize.STRING,
    knownAs: Sequelize.STRING
});

module.exports = Actor;