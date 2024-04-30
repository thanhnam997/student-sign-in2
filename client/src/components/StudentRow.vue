<script setup>
 // Import necessary functions from Vue
import { ref } from 'vue'
 // Define props to receive data from the parent component
const props = defineProps({
    student: Object
})
// Define emits to emit custom events to the parent component
const emit = defineEmits(['arrived-or-left', 'delete-student'])

// A new ref to track if this student is present or not 
const isStudentPresent = ref( props.student.present )
// Function to notify parent component when the student arrives or leaves
const notifyArrivedOrLeft = () => {
    emit('arrived-or-left', props.student, isStudentPresent.value) 
}
 // Function to confirm and delete the student
const confirmThenDeleteStudent = () => {
    if (confirm(`Delete ${props.student.name}?`)) {
        emit('delete-student', props.student)
    } 
}

</script>

<template>

<tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">
    <!-- Display student's name -->
    <td>{{ student.name }}</td>
   <!-- Display student's Star ID -->
    <td>{{ student.starID }}</td>
    <td> 
       <!-- Checkbox to toggle student's presence -->
        <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
        <!-- Display text based on student's presence -->
        <span class="mx-3" v-if="student.present">Here!</span>
        <span class="mx-3" v-else>Not present</span>
    </td>
    <td>
       <!-- Button to delete the student -->
        <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
            <i class="bi bi-trash-fill"></i> Delete
        </button>
    </td>
</tr>

</template>

<style scoped>


.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}


</style>
