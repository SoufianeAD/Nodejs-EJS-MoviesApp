const express = require('express');

const path = require('path');
const usersController = require('../controllers/UserController');

const router = express.Router();
/*
router.get('/add-actor', actorsController.getAddActorPage);
router.post('/post-actor', actorsController.postAddActor);
router.get('/admin/actors-list', actorsController.getActorsList);
router.get('/admin/delete-actor/:id', actorsController.deleteMovie);
router.get('/admin/add-actor-movie/:idActor/:idMovie', actorsController.getAddActorMovie);
router.get('/admin/delete-actor-movie/:idActor/:idMovie', actorsController.getDeleteActorMovie);
router.get('/admin/edit-actor/:id', actorsController.getEditActorPage);
router.post('/admin/post-edit-actor/:id', actorsController.postEditActor);*/

router.get('/sign-up', usersController.getSignUpPage);
router.get('/sign-in', usersController.getSignInPage);
router.post('/user/sign-up', usersController.postSignUp);
router.post('/user/sign-in', usersController.postSignIn);


module.exports = router;