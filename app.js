const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const Movie = require('./models/Movie');
const Actor = require('./models/Actor.js');

const errorsController = require('./controllers/ErrorsController');

const app = express();

const moviesRoutes = require('./routes/MoviesRoutes');
const actorsRoutes = require('./routes/ActorsRoutes');
const usersRoutes = require('./routes/USerRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(moviesRoutes);
app.use(actorsRoutes);
app.use(usersRoutes);

Actor.belongsToMany(Movie, {
    through: "actor_movie",
    as: "movies",
    foreignKey: "actor_id"
});
Movie.belongsToMany(Actor, {
    through: "actor_movie",
    as: "actors",
    foreignKey: "movie_id"
});

sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(3000);
    })
    .catch(err => console.log(err));
