<template>
    <div class="container mt-5">
      <h2>Agregar un Nuevo Gato</h2>
      <AddCatForm />
    </div>
  </template>
  
  <script>
  import AddCatForm from '../components/AddCatForm.vue';
  
  export default {
    name: 'AddCatPage',
    components: {
      AddCatForm
    }
  };
  </script>
