<script setup>
 // Import necessary functions from Vue
import { ref } from 'vue'
 // Import the student store
import { useStudentStore } from './StudentStore.js'
// Initialize the student store
const studentStore = useStudentStore()

// Define reactive variables for new student name, Star ID, and form errors


const newStudentName = ref('')
const newStarID = ref('')
            

const formErrors = ref([])

// Function to add a new student
const addStudent = () => {
    formErrors.value = []   // clear errors array
// Check if the student name is entered
    if (!newStudentName.value) {
        formErrors.value.push('Student name must be entered')
    }

    if (!newStarID.value) {
        formErrors.value.push('StarID must be entered')
    }

    // if there are no errors
    if (formErrors.value.length == 0) {
        let student = { name: newStudentName.value, starID: newStarID.value, present: false }
 // Add the new student to the student store
        studentStore.addNewStudent(student)
        newStudentName.value = ''   // clear form input
        newStarID.value = ''  
    }
}

</script>

<template>

<div id="new-student-form-errors" class="m-2">
    <!-- Display form errors if there are any -->
    <div class="alert alert-danger" v-if="formErrors.length > 0">
        <!-- Iterate over formErrors array to display each error -->
        <li v-for="error in formErrors" v-bind:key="error">
            {{ error }}
        </li>
    </div>
</div>

<div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>
<!-- Form inputs for student name and Star ID -->
    <div class="form-group mb-3">
        <label for="name">Name</label>
        <input id="name" class="form-control" v-model.trim="newStudentName">
    </div>
    <div class="form-group mb-3">
        <label for="starID">Star ID</label>
        <input id="starID" class="form-control" v-model.trim="newStarID">
    </div>
 <!-- Button to add a new student -->
    <button class="btn btn-primary" v-on:click="addStudent">Add</button>
</div>


</template>

<style scoped>

</style>