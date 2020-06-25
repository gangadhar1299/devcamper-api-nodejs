const express = require('express');
const router = express.Router();
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamps');

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp)

router
    .route('/:id')
    .get(getBootcamp)
    .patch(updateBootcamp)
    .delete(deleteBootcamp)

module.exports = router;