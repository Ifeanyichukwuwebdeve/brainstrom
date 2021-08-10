const express = require('express')
const { body } = require('express-validator')
// const { check } = require('express-validator');

const router = express.Router()
const courseController = require('../controllers/addCourse')

// Science Routes

router.get('/get-sciences-courses', courseController.getScienceCourses)

router.get('/get-science-course/:courseId', courseController.getScienceCourse)

router.post('/add-science-course',
[
  body('courseName')
    .notEmpty()
    .withMessage('Please add course name'),
  body('subjects')
    .notEmpty()
    .withMessage('Please add all subjects')
], courseController.addScienceCourse)

router.delete('/delete-science-course/:courseId', courseController.deleteScienceCourse)

// Arts Routes

router.get('/get-arts-courses', courseController.getArtCourses)

router.get('/get-arts-course/:courseId', courseController.getArtCourse)

router.post('/add-arts-course',
[
  body('courseName')
    .notEmpty()
    .withMessage('Please add course name'),
  body('subjects')
    .notEmpty()
    .withMessage('Please add all subjects')
], courseController.addArtCourse)

router.delete('/delete-arts-course/:courseId', courseController.deleteArtsCourse)

module.exports = router