<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Subir archivo ARFF para predicción</h1>

    <!-- Formulario de carga -->
    <form @submit.prevent="enviarArchivo">
      <input type="file" @change="handleFileChange" accept=".arff" class="mb-4" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
    </form>

    <!-- Estadísticas -->
    <div v-if="estadisticas" class="mt-6 bg-gray-100 p-4 rounded shadow">
      <h2 class="text-lg font-semibold mb-2">Estadísticas:</h2>
      <div v-if="estadisticas.porcentajePorSexo">
        <div v-for="(valor, sexo) in estadisticas.porcentajePorSexo" :key="sexo">
          <p><strong>{{ sexo }}:</strong> {{ valor }}</p>
        </div>
      </div>
      <p><strong>🐱 Raza más adoptada:</strong> {{ estadisticas.razaMasAdoptada }}</p>
      <p><strong>🎨 Color más común:</strong> {{ estadisticas.colorComunNombre }}</p>
    </div>

    <!-- Resultados de la predicción -->
    <div v-if="resultado.length" class="mt-6">
      <h2 class="text-lg font-semibold">Resultados de la predicción:</h2>
      <ul class="list-disc ml-6 mt-2">
        <li v-for="(linea, index) in resultado" :key="index">{{ linea }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      archivo: null,
      resultado: [],
      estadisticas: null
    };
  },
  methods: {
    handleFileChange(event) {
      this.archivo = event.target.files[0];
    },
    async enviarArchivo() {
      if (!this.archivo) {
        alert('Por favor selecciona un archivo .arff');
        return;
      }

      const formData = new FormData();
      formData.append('archivoArff', this.archivo);

      try {
        const response = await axios.post('http://localhost:5000/api/predictor', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.resultado = response.data.resultado;
        this.estadisticas = response.data.estadisticas;
      } catch (error) {
        console.error('Error al enviar el archivo:', error);
        alert('Ocurrió un error al enviar el archivo.');
      }
    }
  }
};
</script>
