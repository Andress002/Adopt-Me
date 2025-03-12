<template>
  <div class="card mb-4">
    <div class="card-img-wrapper">
      <img
        :src="`http://localhost:5000/uploads/${pet.image}`"
        class="card-img-top"
        :alt="pet.type === 'cat' ? 'Imagen de gato' : 'Imagen de perro'"
      >
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ pet.name }}</h5>
      <p class="card-text">{{ pet.description }}</p>
      <p class="card-text"><strong>Edad:</strong> {{ pet.age }} años</p>
      <p class="card-text"><strong>Vacunado:</strong> {{ pet.vaccinated ? 'Sí' : 'No' }}</p>
      <p class="card-text"><strong>Tamaño:</strong> {{ getSizeLabel(pet.size) }}</p>
      <div class="card-buttons">
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PetCard',
  props: {
    pet: Object,
    showAdoptButton: Boolean
  },
  computed: {
    isAdmin() {
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
      this.$router.push({ name: 'AdoptionForm', params: { petId: this.pet._id, petType: this.pet.type } });
    },
    getSizeLabel(size) {
      switch (size) {
        case 'small':
          return 'Pequeño';
        case 'medium':
          return 'Mediano';
        case 'large':
          return 'Grande';
        default:
          return 'Desconocido';
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px; 
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img-wrapper {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-img-wrapper:hover .card-img-top {
  transform: scale(1.1);
}

.card-body {
  padding: 1rem;
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.card-buttons {
  display: flex;
  justify-content: space-around;
}

.btn-danger, .btn-success {
  width: 45%;
  margin-top: 10px;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success:hover {
  background-color: #218838;
}
</style>