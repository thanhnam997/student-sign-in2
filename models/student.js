// Define and export a function that sets up the Student model.
// This function takes a sequelize instance and a DataTypes object as arguments.
module.exports = (sequelize, DataTypes) => {
    // Define the Student model with specific fields: name, starID, and present.
    const Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,// Specifies the data type for name as string.
            allowNull: false, // The name field cannot be null, making it required.
            validate: {
                notEmpty: true // Validation rule that ensures the name field is not an empty string.
            }
        },
        starID: {
            type: DataTypes.STRING,// Specifies the data type for starID as string.
            allowNull: false,// The starID field cannot be null, making it required.
            unique: true,// Ensures that each starID is unique across all student entries.
            validate: {
                notEmpty: true// Validation rule that ensures the starID field is not an empty string.
            }
        },
        present: {
            type: DataTypes.BOOLEAN,// Specifies the data type for present as boolean.
            allowNull: false,// The present field cannot be null.
            defaultValue: false// Sets the default value of present to false when a new student is created.
        }
    })
 // Synchronize the Student model with the database.
     // This ensures the database table conforms to the defined model without forcing a re-creation of the table.
 Student.sync({ force: false }).then( () => {
        console.log('Synced student table')// Log a message once the table is synchronized.
    })
 // Return the defined Student model for use elsewhere in the application.
    return Student
}
