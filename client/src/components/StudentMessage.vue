<script setup>
// Import necessary functions from Pinia

import { storeToRefs } from 'pinia'
// Import the student store
import { useStudentStore } from './StudentStore.js'
// Initialize the student store
const studentStore = useStudentStore()
// Destructure the mostRecentStudent from the studentStore and make it reactive
const { mostRecentStudent } = storeToRefs(studentStore)

</script>

<template>

<div id="welcome-or-goodbye-message" class="m-2">
    <!-- Check if there is a most recent student -->
    <div v-if="mostRecentStudent.name">
 <!-- Display a welcome message if the most recent student is present -->
        <div v-if="mostRecentStudent.present" class="alert alert-success">
            Welcome, {{ mostRecentStudent.name }}!
        </div>
       
        <!-- Display a goodbye message if the most recent student is not present -->
        <div v-else class="alert alert-info">
            Goodbye, {{ mostRecentStudent.name }}. See you later!
        </div>     
    </div>  
</div>

</template>

<style scoped>

</style>