<template>
  <div>
    <h1>Lista de Mascotas</h1>
    <ul>
      <li v-for="mascota in mascotas" :key="mascota._id">
        <span v-if="mascota.tipo === 'cat'">🐱</span>
        <span v-else-if="mascota.tipo === 'dog'">🐶</span>
        {{ mascota.name }} - {{ mascota.breed }}
        <!-- Mostrar el botón de eliminar solo si el usuario es admin -->
        <button
          v-if="authState.isAuthenticated && authState.userRole === 'admin'"
          @click="eliminarMascota(mascota._id)"
          class="btn btn-danger"
        >
          Eliminar
        </button>
      </li>
    </ul>

    <form @submit.prevent="crearMascota">
      <input v-model="nuevoMascota.name" placeholder="Nombre" required />
      <input v-model="nuevoMascota.breed" placeholder="Raza" required />
      <input v-model="nuevoMascota.age" placeholder="Edad" type="number" required />
      <textarea
        v-model="nuevoMascota.description"
        placeholder="Descripción"
      ></textarea>
      <select v-model="nuevoMascota.tipo" required>
        <option value="cat">Gato</option>
        <option value="dog">Perro</option>
      </select>
      <button type="submit">Agregar Mascota</button>
    </form>
  </div>
</template>

<script>
import { obtenerMascotas, crearMascota, eliminarMascota } from '@/api.js';
import { inject } from 'vue';

export default {
  name: 'PetList',
  data() {
    return {
      mascotas: [],
      nuevoMascota: {
        name: '',
        breed: '',
        age: '',
        description: '',
        tipo: 'cat', 
      },
    };
  },
  computed: {
    authState() {
      return inject('authState'); // Se inyecta el estado de autenticación desde App.vue
    },
  },
  async created() {
    // Se asume que la API devuelve un array de mascotas con campos como _id, name, breed, description, tipo, etc.
    this.mascotas = await obtenerMascotas().then(res => res.data);
  },
  methods: {
    async crearMascota() {
      // Envía los datos de la nueva mascota a la API
      const mascota = await crearMascota(this.nuevoMascota).then(res => res.data);
      this.mascotas.push(mascota);
      // Reinicia el formulario
      this.nuevoMascota = { name: '', breed: '', age: '', description: '', tipo: 'cat' };
    },
    async eliminarMascota(id) {
      await eliminarMascota(id);
      this.mascotas = this.mascotas.filter(mascota => mascota._id !== id);
    },
  },
};
</script>


