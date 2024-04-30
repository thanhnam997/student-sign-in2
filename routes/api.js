// Import the necessary modules
const express = require('express')
const database = require('../models')
const Student = database.Student
// Create a new router instance
const router = express.Router()
// GET route to fetch all students, ordered by 'present' and then 'name'
router.get('/students', function(req, res, next) {
    Student.findAll( {order: ['present', 'name']} ).then( students => {
        return res.json(students)// Send the fetched students as JSON
    }).catch( err => {
        return next(err)// Pass any errors to the next middleware (error handler)
    })
})
// POST route to create a new student
router.post('/students', function(req, res, next){
    const newStudent = req.body// Get the student data from the request body
    console.log(newStudent) // Log the new student data for debugging purposes
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!') // Send a 201 status code for resource creation
    }).catch( err => {
        if (err instanceof database.Sequelize.ValidationError) {
           // Handle validation errors specifically
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)// Send validation error messages as JSON
        } else {
            return next(err)// Pass other types of errors to the next middleware
        }
    })
})
// PATCH route to update a specific student by their ID
router.patch('/students/:id', function(req, res, next) {
    const studentID = req.params.id // Get the student ID from the URL parameter
    const updatedStudent = req.body // Get the updated student data from the request body
    console.log(studentID, updatedStudent)// Log the student ID and updated data for debugging
    Student.update( updatedStudent, { where: { id: studentID} })
        .then( (result) => {
            const rowsModified = result[0]
            if (rowsModified == 1) {
                return res.send('Student updated')// Confirm update if one row was modified
            } else {
                return res.status(404).send('Student not found')// Send a 404 if no rows were modified
            }
        })
        .catch( err => {
            if (err instanceof database.Sequelize.ValidationError) {
                const messages = err.errors.map( e => e.message )
                return res.status(400).json(messages)// Send validation error messages as JSON
            } else {
                return next(err) // Pass other types of errors to the next middleware
            }
            })
        
        })

// DELETE route to remove a specific student by ID
router.delete('/students/:id', function(req, res, next) {
    const studentID = req.params.id// Get the student ID from the URL parameter
    Student.destroy({where: { id: studentID}})
        .then( (rowsDeleted) => {
            if (rowsDeleted === 1) {
                return res.send('Student deleted') // Confirm deletion if one row was deleted
            } else {
                return res.status(404).send('Student not found') // Send a 404 if no rows were deleted
            }
        }).catch( err => {// Pass any errors to the next middleware
            return next(err)
        })
})
// Export the router to be mounted by the main
module.exports = router




