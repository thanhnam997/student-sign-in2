// Import necessary functions from Pinia and Vue composition API
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'
// Initialize the API client with the base URL for student-related API calls
const studentAPI = mande('api/students')
// Define and export a Pinia store named 'students' for state management
export const useStudentStore = defineStore('students', () => {
// A reactive reference array to hold the list of student objects
    const studentList = ref( [] )
// A reactive reference to store the most recently added or modified student
    const mostRecentStudent = ref( {} )
  // A reactive reference to store any error messages from the add new student operation
    const addNewStudentErrors = ref( [] )
// Function to fetch all students from the backend and update the studentList reactive reference
    function getAllStudents() {
        return studentAPI.get().then( students => {
            studentList.value = students
        })
    }
 // Function to add a new student via POST request and refresh the student list on success
    function addNewStudent(student) {
        studentAPI.post(student).then( resp => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }
// Function to delete a student using their ID and refresh the student list afterward
    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        })
    }
 // Function to update the 'arrived' or 'left' status of a student and refresh the list
    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        })
    }
// Computed property to get a sorted array of students by name
    // Note: The use of 'toSorted' is incorrect as it doesn't exist; should use 'sort'
    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })
 // Computed property to count the number of students
    const studentCount = computed( () => {
        return studentList.value.length
    })
// Expose reactive data, functions, and computed properties for use in components
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