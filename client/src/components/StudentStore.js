// Import necessary functions and utilities from Pinia and Vue
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'
// Set up the base URL for the student API
const studentAPI = mande('api/students')
// Define and export a Pinia store for managing student data
export const useStudentStore = defineStore('students', () => {
 // Reactive state for the list of all students
    const studentList = ref( [] )
// Reactive state for the most recently added or updated student
    const mostRecentStudent = ref( {} )
// Reactive state for storing any errors that occur when adding a new student
    const addNewStudentErrors = ref( [] )
// Function to fetch all students from the backend and update the studentList state
    function getAllStudents() {
        return studentAPI.get().then( students => {
            studentList.value = students
        })
    }
 // Function to add a new student via the API and refresh the list after successful addition
    function addNewStudent(student) {
        studentAPI.post(student).then( resp => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }
// Function to delete a student based on their unique identifier
    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        })
    }
 // Function to update a student's status (e.g., arrival or departure)
    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        })
    }
// Computed property to return students sorted by their name
    // Note: 'toSorted' is incorrect here and should be replaced with a valid method like `sort`
    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })
 // Computed property to get the count of students in the list
    const studentCount = computed( () => {
        return studentList.value.length
    })
// Publicly exposed reactive data, functions, and computed properties
    return { 
        // reactive data
        studentList, 
        mostRecentStudent, 
        addNewStudentErrors,

        // functions
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 
        getAllStudents,

        // computed properties
        sortedStudents,
        studentCount
    }

})