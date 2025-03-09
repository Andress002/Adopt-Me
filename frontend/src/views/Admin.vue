<template>
  <div class="container mt-5">
    <h2>Panel de Administrador</h2>
    <AddCatForm /> 
  </div>
</template>

<script>
import AddCatForm from '../components/AddCatForm.vue'; 

export default {
  name: 'Admin',
  components: {
    AddCatForm
  }
};
</script>

<style scoped>

</style>
