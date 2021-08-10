const Science = require('../models/Science')
const Arts = require('../models/Arts')

const { validationResult } = require('express-validator')

// Science Exports

exports.getScienceCourses = async (req, res, next) => {
  try {
    const courses = await Science.find()
    res.status(200).json({ message: 'Found courses', courses })
  } catch (error) {
    next(error)
  }
}

exports.getScienceCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId
    const course = await Science.findById({ _id: courseId })
    if (!course) {
      const error = new Error('Failed to find course')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ message: 'Found course', course })
  } catch (error) {
    next(error)
  }
}

exports.addScienceCourse = async (req, res, next) => {
try {
    const { courseName, subjects } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    const course = new Science ({
      courseName,
      subjects
    })
    const result = await course.save()
		res.status(201).json({ message: 'Course added', course: result })
} catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteScienceCourse = async (req, res, next) => {
  try {
    const categoryId = req.params.courseId
		await Science.findByIdAndDelete(courseId)
		res.status(200).json({ message: 'Course deleted' })
  } catch (error) {
    next(error)
  }
}

// Arts Exports

exports.getArtCourses = async (req, res, next) => {
  try {
    const courses = await Arts.find()
    res.status(200).json({ message: 'Found courses', courses })
  } catch (error) {
    next(error)
  }
}

exports.getArtCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId
    const course = await Arts.findById({ _id: courseId })
    if (!course) {
      const error = new Error('Failed to find course')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({ message: 'Found course', course })
  } catch (error) {
    next(error)
  }
}

exports.addArtCourse = async (req, res, next) => {
  try {
    const { courseName, subjects } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    const course = new Arts ({
      courseName,
      subjects
    })
    const result = await course.save()
		res.status(201).json({ message: 'Course added', course: result })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteArtsCourse = async (req, res, next) => {
  try {
    const categoryId = req.params.courseId
		await Arts.findByIdAndDelete(courseId)
		res.status(200).json({ message: 'Course deleted' })
  } catch (error) {
    next(error)
  }
}