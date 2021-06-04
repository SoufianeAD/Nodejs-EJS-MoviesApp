const Movie = require('../models/Movie');
const Actor = require('../models/Actor');

exports.getAddMoviePage = (req, res, next) => {
    res.render('movies/add-movie', {pageTitle: 'Add Movie'});
}

exports.postAddMovie = (req, res, next) => {
    Movie.create({
        title: req.body.title,
        ratings: req.body.ratings,
        publishDate: req.body.publishDate,
        imgUrl: req.body.imgUrl,
        videoUrl: req.body.videoUrl,
        overView: req.body.overView
        })
        .then(() => {
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
    Movie.findByPk(id,{
        include: [
            {
                model: Actor,
                as: "actors",
            }
        ],
    })
        .then((movie) => {
            res.render('movies/movie-details', {pageTitle: 'Details', movie: movie});
    })
        .catch(err => console.log(err));
}

// admin

exports.getMoviesList = (req, res, next) => {
    Movie.findAll()
        .then((movies) => {
            res.render('movies/movies-list', {pageTitle: 'Movies-list', movies: movies});
        })
        .catch(err => console.log(err));
}

exports.getEditMoviePage = (req, res, next) => {
    const id = req.params.id;
    // Movie.findAll({where: {id: id}})
    Movie.findByPk(id)
        .then((movie) => {
            console.log(movie);
            res.render('movies/edit-movie', {pageTitle: 'Edit-movie', movie: movie});
        })
        .catch(err => console.log(err));
}

exports.postEditMovie = (req, res, next) => {
    const id = req.params.id;

    Movie.findByPk(id)
        .then((movie) => {
        console.log(movie);
            movie.title = req.body.title;
            movie.ratings = req.body.ratings;
            movie.publishDate = req.body.publishDate;
            movie.imgUrl = req.body.imgUrl;
            movie.videoUrl = req.body.videoUrl;
            movie.overView = req.body.overView;
            movie.save();
            res.redirect('/admin/movies-list');
         })
        .catch(err => console.log(err));
}

exports.deleteMovie = (req, res, next) => {
    const id = req.params.id;

    Movie.findByPk(id)
        .then((movie) => {
            return movie.destroy();
        })
        .then(result => res.redirect('/admin/movies-list'))
        .catch(err => console.log(err));
}