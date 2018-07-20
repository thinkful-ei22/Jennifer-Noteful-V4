'use strict';

const express = require('express');
const passport = require('passport');
const {getAllTags, getTagById, createTag, updateTag, deleteTag} = require('../controllers/tags.controllers');
const router = express.Router();

router.use(('/', passport.authenticate('jwt', { session: false, failWithError: true })));

router.route('/')
  .get(getAllTags)
  .post(createTag);
  
router.route('/:id')
  .get(getTagById)
  .put(updateTag)
  .delete(deleteTag);



module.exports = router;