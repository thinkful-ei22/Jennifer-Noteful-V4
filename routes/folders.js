'use strict';

const express = require('express');
const passport = require('passport');
const {getAllFolders, getFolderById, createFolder, updateFolder, deleteFolder} = require('../controllers/folders.controllers');
const router = express.Router();

router.use(('/', passport.authenticate('jwt', { session: false, failWithError: true })));

router.route('/')
  .get(getAllFolders)
  .post(createFolder);

router.route('/:id')
  .get(getFolderById)
  .put(updateFolder)
  .delete(deleteFolder);

module.exports = router;
