<script setup>
// Import necessary functions from Vue
import StudentRow from './StudentRow.vue'

import { computed } from 'vue'
 // Import necessary functions from Pinia
import { storeToRefs } from 'pinia' 

import { useStudentStore } from './StudentStore.js'
 // Initialize the student store
const studentStore = useStudentStore()
 // Destructure reactive variables from the student store
const { sortedStudents, studentCount } = storeToRefs(studentStore)
 // Function to update student's presence status
const arrivedOrLeft = (student, isStudentPresent) => {
    student.present = isStudentPresent
    studentStore.arrivedOrLeft(student)
}
// Function to delete a student
const deleteStudent = (student) => {
    studentStore.deleteStudent(student)
}
 // Computed property to generate a message about the number of students in class
const pluralStudentMessage = computed (() => {
    if (studentCount.value == 1) {
        return 'There is 1 student in class.'
    } else {
        return `There are ${studentCount.value} students in class.`
    }
})

</script>

<template>

<div id="student-list-table" class="card m-2 p-2">
    <!-- Title and subtitle displaying the number of students in class -->
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted"> {{ pluralStudentMessage }} </h5>
    <div id="student-table">
       <!-- Table to display student list -->
        <table class="table">
            <thead>
                <tr class="align-middle">
                    <th>Name</th>
                    <th>StarID</th>
                    <th>Present?</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody>
 <!-- Loop through sorted students and render StudentRow component -->
                <StudentRow 
                    v-for="student in sortedStudents" 
                    v-bind:key="student.starID"
                    v-bind:student="student" 
                    v-on:delete-student="deleteStudent"
                    v-on:arrived-or-left="arrivedOrLeft">       
                </StudentRow>

            </tbody>
        </table>
    </div>
</div>


</template>

<style scoped>

#student-table {
    max-height: 500px;
    overflow: scroll;
}

th, td {
    width: 25%;
    text-align: center;
}

</style>