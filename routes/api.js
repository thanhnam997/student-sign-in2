//Import the required modules
const express = require('express')
const database = require('../models/index')
// Importing student model incorrectly; correct import shown in the Student definition
const student = require('../models/student')
const Student = database.Student

// Create an instance of the express Router
const router = express.Router()

// GET route to fetch all students sorted by name
router.get('/students', function(req, res, next) {
    Student.findAll( {order: ['name']}).then( students => {
        return res.json(students)
    })
})

// POST route to add a new student
router.post('/students', function(req, res, next){
    const newStudent = req.body// Get student data from request body
  console.log(newStudent)// Log the new student data
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')// Send a success response
    }).catch(err => {
    }).catch ( err => {
        if(err instanceof database.sequelize.ValidationError) {// Check for validation errors
            const messages= err.errors.map( e => e.messages )// Extract error messages
            return res.status(400).json(messages)// Send the validation errors

        }else{
            return next(err);// Pass other types of errors to the error handler
        }
    })
})

// GET route to fetch all students, should be combined with the above GET route for cleaner code
router.get('/student', function(req,res,next){
    student.findAll( {order: ['present','name']} ).then( student =>{
        return res.json(student)// This seems redundant and potentially incorrect due to similar naming
    }).catch(err => {
        return next(err)// Error handling
    })
})
// PATCH route to update a specific student by ID
router.patch('/students/:id', function(req, res, next) {
    const studentID = req.params.id
    const updatedStudent = req.body 
    console.log(studentID, updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID} })
        .then( (result) => {
            const rowsModified = result[0]
            if (rowsModified == 1) {
                return res.send('Student updated')
            } else {
                return res.status(404).send('Student not found')
            }
        })
        .catch( err => {
            if (err instanceof database.Sequelize.ValidationError) {
                const messages = err.errors.map( e => e.message )
                return res.status(400).json(messages)
            } else {
                return next(err)
            }
        })
})
// DELETE route to remove a specific student by ID
router.delete('/students/:id', function(req, res, next) {
    const studentID = req.params.id
    Student.destroy({where: { id: studentID}})
        .then( (rowsDeleted) => {
            if (rowsDeleted === 1) {
                return res.send('Student deleted')// Confirm deletion if one row was deleted
            } else {
                return res.status(404).send('Student not found')    // No rows deleted means no student found
            }
        }).catch( err => {
            return next(err) // Error handling
        })
})




// Export the router
module.exports =router