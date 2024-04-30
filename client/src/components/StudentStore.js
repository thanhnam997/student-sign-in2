// Import necessary functions from Vue and Pinia
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// Define and export the student store
export const useStudentStore = defineStore('students', () => {
 // Define reactive variables
    const studentList = ref([
        { name: "A. Student", starID: "aa1234aa", present: false },
        { name: "B. Student", starID: "bb1234bb", present: false }
    ])

    const mostRecentStudent = ref( {} )
 // Function to add a new student to the list
    function addNewStudent(student) {
        studentList.value.push(student)
    }
// Function to delete a student from the list
    function deleteStudent(studentToDelete) {
        studentList.value = studentList.value.filter( (student) => {
            return studentToDelete != student
        })
    }
 // Function to update whether a student has arrived or left
    function arrivedOrLeft(student) {
        // Returns -1 if the student is not found
        const studentToModifyIndex = studentList.value.findIndex(s => s.starID == student.starID)
        if (studentToModifyIndex != -1) {
            mostRecentStudent.value = student
            studentList.value[studentToModifyIndex] = student
        }
    }
 // Computed property to sort the student list alphabetically by name
    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })
// Computed property to get the total count of students
    const studentCount = computed( () => {
        return studentList.value.length
    })
// Expose reactive data
    return { 
        // reactive data
        studentList, 
        mostRecentStudent, 

        // functions
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 

        // computed properties
        sortedStudents,
        studentCount
    }

})