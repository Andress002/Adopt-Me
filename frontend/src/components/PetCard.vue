<template>
  <div class="card mb-4">
    <img
      :src="`http://localhost:5000/uploads/${pet.image}`"
      class="card-img-top"
      :alt="pet.tipo === 'cat' ? 'Imagen de gato' : 'Imagen de perro'"
    >
    <div class="card-body">
      <h5 class="card-title">{{ pet.name }}</h5>
      <p class="card-text">{{ pet.description }}</p>
      <button
        v-if="isAdmin"
        @click="deletePet"
        class="btn btn-danger"
      >
        Eliminar
      </button>
      <button
        v-if="showAdoptButton"
        @click="adoptPet"
        class="btn btn-success"
      >
        Adoptar
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import authState from '@/authState';

export default {
  name: 'PetCard',
  props: {
    pet: Object,
    showAdoptButton: Boolean
  },
  computed: {
    isAdmin() {
      // Puedes obtener el usuario desde localStorage o authState si lo inyectas globalmente.
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.role === 'admin';
    }
  },
  methods: {
    async deletePet() {
      const confirmation = confirm("¿Estás seguro de que deseas eliminar esta mascota?");
      if (!confirmation) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/pets/${this.pet._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Emitiendo evento pet-deleted con el ID', this.pet._id);
        this.$emit('pet-deleted', this.pet._id);
      } catch (error) {
        console.error('Error al eliminar la mascota:', error);
      }
    },
    adoptPet() {
      // Redirige al formulario de adopción pasando el ID de la mascota
      this.$router.push({ name: 'AdoptionForm', params: { petId: this.pet._id } });
    }
  }
};
</script>




<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-body {
  text-align: center;
}

.btn-danger {
  width: 100%;
}
</style>
