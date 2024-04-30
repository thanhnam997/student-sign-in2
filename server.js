// Import necessary Node.js modules
const express = require('express')// Express framework for handling requests
const apiRoutes = require('./routes/api.js')// Import API routes defined in a separate file
const path = require('path')// Node.js path module to handle file paths
// Create an Express application
const app = express()
// Middleware to parse JSON bodies. This will let us handle JSON data in requests easily.
app.use(express.json()) 
// Define the path for static files (e.g., front-end JavaScript, CSS, images)
const staticFilePath = path.join(__dirname, 'client', 'dist') 
// Serve static files from the specified directory
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles)
// Use API routes for any routes that begin with '/api'
app.use('/api', apiRoutes)
// Middleware to catch 404 errors (i.e., no route matched the request)
app.use(function(req, res, next) {
    res.status(404).send('Not found')
})
// Error-handling middleware to catch any other errors that occur during the request/response cycle
// This middleware needs 4 parameters to be identified as an error-handling middleware by Express
app.use(function(req, res, next, err) {
    console.error(err.stack)  // for server developers
    res.status(500).send('Server error') // for client 
})

// Start the server on the environment's designated port or 3000 if none specified
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port', server.address().port)
})
