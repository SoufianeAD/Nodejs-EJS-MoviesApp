const Actor = require('../models/Actor');
const Movie = require('../models/Movie');
const _ = require('lodash');

exports.getAddActorPage = (req, res, next) => {
    Movie.findAll()
        .then((movies) => {
            res.render('actors/add-actor', {pageTitle: 'Add Actor', movies: movies});
        })
        .catch(err => console.log(err));
}

exports.postAddActor = (req, res, next) => {
    Actor.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        imgUrl: req.body.imgUrl,
        knownAs: req.body.knownAs,
    })
        .then((actor) => {
            const options = req.body.option;
            options.map((e) => {
                Movie.findByPk(+e).then(movie => {
                    actor.addMovie(movie);
                });
            });
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.getMovies = (req, res, next) => {
    Movie.findAll()
        .then((movies) => {
            res.render('movies/movies', {pageTitle: 'Movies', movies: movies});
        })
        .catch(err => console.log(err));
}

exports.getMovieDetails = (req, res, next) => {
    const id = req.params.id;
    Movie.findByPk(id)
        .then((movie) => {
            console.log(movie);
            res.render('movies/movie-details', {pageTitle: 'Details', movie: movie});
        })
        .catch(err => console.log(err));
}

// admin

exports.getActorsList = (req, res, next) => {
    Actor.findAll()
        .then((actors) => {
            res.render('actors/actors-list', {pageTitle: 'Actors-list', actors: actors});
        })
        .catch(err => console.log(err));
}

exports.getEditActorPage = (req, res, next) => {
    const id = req.params.id;
    Actor.findByPk(id,{
        include: [
            {
                model: Movie,
                as: "movies",
            }
        ],
    })
        .then((actor) => {
            Movie.findAll()
                .then((movies) => {
                    const idsActorMovies = _.map(actor.movies, 'id');
                    console.log('idsActorMovies : ' + idsActorMovies);
                    res.render('actors/edit-actor', {pageTitle: 'Edit-actor', a: actor, movies: movies, idsActorMovies: idsActorMovies});
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

exports.postEditActor = (req, res, next) => {
    const id = req.params.id;

    Actor.findByPk(id)
        .then((actor) => {
            actor.firstName = req.body.firstName;
            actor.lastName = req.body.lastName;
            actor.dateOfBirth = req.body.dateOfBirth;
            actor.imgUrl = req.body.imgUrl;
            actor.knownAs = req.body.knownAs;
            actor.save();
            res.redirect('/admin/actors-list');
        })
        .catch(err => console.log(err));
}

exports.deleteMovie = (req, res, next) => {
    const id = req.params.id;

    Actor.findByPk(id)
        .then((actor) => {
            return actor.destroy();
        })
        .then(result => res.redirect('/admin/actors-list'))
        .catch(err => console.log(err));
}

exports.getAddActorMovie = (req, res, next) => {
    const idActor = req.params.idActor;
    const idMovie = req.params.idMovie;

    Actor.findByPk(idActor)
        .then((actor) => {
            Movie.findByPk(idMovie)
                .then(movie => {
                    actor.addMovie(movie);
                    res.redirect('/admin/actors-list');
                });
        })
        .catch(err => console.log(err));

}
exports.getDeleteActorMovie = (req, res, next) => {
    const idActor = req.params.idActor;
    const idMovie = req.params.idMovie;

    Actor.findByPk(idActor)
        .then((actor) => {
            Movie.findByPk(idMovie)
                .then(movie => {
                    actor.removeMovie(movie);
                    res.redirect('/admin/actors-list');
                });
        })
        .catch(err => console.log(err));
}