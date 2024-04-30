// Import necessary functions and libraries from Vue and Pinia
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'
// Create an API instance for the student endpoint
const studentAPI = mande('api/students')
// Define and export a Pinia store named 'students'
export const useStudentStore = defineStore('students', () => {
// A reactive reference to hold the list of students
    const studentList = ref( [] )
// A reactive reference to store the most recently added or interacted student
    const mostRecentStudent = ref( {} )
 // A reactive reference to store any errors that occur during the addition of a new student
    const addNewStudentErrors = ref( [] )
// Function to fetch all students from the server and update the studentList
    function getAllStudents() {
        return studentAPI.get().then( students => {
            studentList.value = students
        })
    }

    // Function to add a new student using the API and then refresh the list
    function addNewStudent(student) {
        studentAPI.post(student).then( resp => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }
// Function to delete a student based on their ID and refresh the list
    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        })
    }
// Function to update a student's status (arrived or left) and refresh the list
    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        })
    }
 // Computed property to get a sorted list of students by name
    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })
// Computed property to count the number of students
    const studentCount = computed( () => {
        return studentList.value.length
    })
// Expose state, functions, and computed properties for use in components
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