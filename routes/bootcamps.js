const express = require('express');
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload } = require('../controllers/bootcamps');
const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middlewares/advancedResults');

//Include other resource router
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('admin', 'publisher'), createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .patch(protect, authorize('admin', 'publisher'), updateBootcamp)
    .delete(protect, authorize('admin', 'publisher'), deleteBootcamp);

router.route('/:id/photo').put(protect, authorize('admin', 'publisher'), bootcampPhotoUpload);

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);


module.exports = router;