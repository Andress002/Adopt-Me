<template>
  <div class="container mt-5">
    <div class="form-container">
      <h2 class="form-title">Agregar una Nueva Mascota</h2>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>


      <form @submit.prevent="addMascota">
        <div class="form-group">
          <label for="name" class="form-label">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="mascota.name"
            class="form-control"
            required
            placeholder="Escribe el nombre de la mascota"
          />
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Descripción</label>
          <textarea
            id="description"
            v-model="mascota.description"
            class="form-control"
            required
            placeholder="Escribe una descripción de la mascota"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="type" class="form-label">Tipo</label>
          <select id="type" v-model="mascota.type" class="form-control" required>
            <option value="cat">Gato</option>
            <option value="dog">Perro</option>
          </select>
        </div>
        <div class="form-group">
          <label for="age" class="form-label">Edad</label>
          <input
            type="number"
            id="age"
            v-model="mascota.age"
            class="form-control"
            required
            placeholder="Escribe la edad de la mascota"
          />
        </div>
        <div class="form-group">
          <label for="vaccinated" class="form-label">Vacunado</label>
          <select id="vaccinated" v-model="mascota.vaccinated" class="form-control" required>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div class="form-group">
          <label for="size" class="form-label">Tamaño</label>
          <select id="size" v-model="mascota.size" class="form-control" required>
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>
        <div class="form-group">
          <label for="image" class="form-label">Imagen</label>
          <input
            type="file"
            id="image"
            @change="handleFileUpload"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-submit">Agregar Mascota</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCatForm', 
  data() {
    return {
      mascota: {
        name: '',
        description: '',
        type: 'cat', 
        age: '', 
        vaccinated: 'true', 
        size: 'small', 
      },
      image: null,
    };
  },
  methods: {
    async addMascota() {
      const formData = new FormData();
      formData.append('name', this.mascota.name);
      formData.append('description', this.mascota.description);
      formData.append('type', this.mascota.type);
      formData.append('age', this.mascota.age);
      formData.append('vaccinated', this.mascota.vaccinated);
      formData.append('size', this.mascota.size);
      if (this.image) {
        formData.append('image', this.image);
      }

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/pets', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        alert('Mascota agregada exitosamente');
        // Reinicia el formulario
        this.mascota = { name: '', description: '', type: 'cat', age: '', vaccinated: 'true', size: 'small' };
        this.image = null;
      } catch (error) {
        console.error('Error al agregar la mascota:', error);
        alert('Error al agregar la mascota');
      }
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
  },
};
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.form-container {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 40px;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: 500;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
