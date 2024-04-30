// Import the Sequelize ORM and DataTypes to define model attributes
const { Sequelize, DataTypes } = require('sequelize')
// Load the configuration from a JSON file based on the environment (development, production, etc.)
const configJson = require('../config.json')

// Import the function that defines the Student model
const createStudentModel = require('./student')
// Determine the environment (default to 'development' if the NODE_ENV environment variable isn't set)
const env = process.env.NODE_ENV || 'development'
// Retrieve the database password from environment variables for security (not stored in version control)
const dbPassword = process.env.DB_PASSWORD
// Fetch the database configuration specific to the current environment from the config JSON file
const config = configJson[env]
// Update the configuration's password property with the password from the environment variable
config.password = dbPassword
// Create a new Sequelize instance with the environment-specific configuration
// This instance establishes and manages the connection to your database
const sequelize = new Sequelize(config)
// Create a database object that holds the Sequelize instance and the Sequelize library itself
// This object will be used to access all ORM functionality through Sequelize
const database = {
    sequelize: sequelize,
    Sequelize: Sequelize,
}
// Create the Student model using the sequelize instance and DataTypes
// The model is defined externally and imported via the createStudentModel function
const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name 
database[studentModelName] = studentModel
// Export the database object for use elsewhere in the application
// This export allows other parts of your application to interact with the database through Sequelize
module.exports = database 