const express = require('express');

const path = require('path');
const actorsController = require('../controllers/ActorsController');

const router = express.Router();

router.get('/add-actor', actorsController.getAddActorPage);
router.post('/post-actor', actorsController.postAddActor);
router.get('/admin/actors-list', actorsController.getActorsList);
router.get('/admin/delete-actor/:id', actorsController.deleteMovie);
router.get('/admin/add-actor-movie/:idActor/:idMovie', actorsController.getAddActorMovie);
router.get('/admin/delete-actor-movie/:idActor/:idMovie', actorsController.getDeleteActorMovie);
router.get('/admin/edit-actor/:id', actorsController.getEditActorPage);
router.post('/admin/post-edit-actor/:id', actorsController.postEditActor);

module.exports = router;