<template>
  <div class="container mt-5">
    <h2>Panel de Administrador</h2>
    <AddCatForm /> 
    <ArffPredictor />
  </div>
</template>

<script>
import ArffPredictor from '../components/ArffPredictor.vue';
import AddCatForm from '../components/AddCatForm.vue'; 

export default {
  name: 'Admin',
  components: {
    AddCatForm,
    ArffPredictor
  }
};
</script>

<style scoped>

</style>
