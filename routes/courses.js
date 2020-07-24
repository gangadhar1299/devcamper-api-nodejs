const express = require('express');
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses');

const Course = require('../models/Course');
const advancedResults = require('../middlewares/advancedResults');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

router
    .route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name description'
    }), getCourses)
    .post(protect, authorize('admin', 'publisher'), addCourse);

router
    .route('/:id')
    .get(getCourse)
    .patch(protect, authorize('admin', 'publisher'), updateCourse)
    .delete(protect, authorize('admin', 'publisher'), deleteCourse);

module.exports = router;