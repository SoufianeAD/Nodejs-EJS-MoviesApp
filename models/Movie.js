const Sequelize = require('sequelize');

const sequelize = require('../util/database')

const Movie = sequelize.define('movie', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title : Sequelize.STRING,
    ratings: Sequelize.INTEGER,
    publishDate: Sequelize.DATEONLY,
    imgUrl: Sequelize.STRING,
    videoUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    overView: Sequelize.STRING
});

module.exports = Movie