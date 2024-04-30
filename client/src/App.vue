<script setup>

import { onMounted } from 'vue';

import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue';
import StudentTable from './components/StudentTable.vue';

import { useStudentStore } from './stores/StudentStore';

const StudentStore = useStudentStore()

onMounted( ()  =>{

  StudentStore.getAllStudents()
})


</script>

<template>
  <NewStudentForm></NewStudentForm>
  <StudentMessage></StudentMessage>
  <StudentTable></StudentTable>
</template>




<style scoped>

</style>