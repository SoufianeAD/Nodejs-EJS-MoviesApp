const express = require('express');

const path = require('path');
const moviesController = require('../controllers/MoviesController');

const router = express.Router();

router.get('/add-movie', moviesController.getAddMoviePage);
router.get('/', moviesController.getMovies);
router.get('/movie-details/:id', moviesController.getMovieDetails);
router.post('/post-movie', moviesController.postAddMovie);
router.get('/admin/movies-list', moviesController.getMoviesList);
router.get('/admin/edit-movie/:id', moviesController.getEditMoviePage);
router.post('/admin/post-edit-movie/:id', moviesController.postEditMovie);
router.get('/admin/delete-movie/:id', moviesController.deleteMovie);

module.exports = router;