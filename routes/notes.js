'use strict';

const express = require('express');
const passport = require('passport');
const {getAllNotes, getNoteById, createNote, updateNote, deleteNote} = require('../controllers/notes.controllers');
const router = express.Router();

router.use(('/', passport.authenticate('jwt', { session: false, failWithError: true })));

router.route('/')
  .get(getAllNotes)
  .post(createNote);

router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;