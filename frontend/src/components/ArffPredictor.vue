<template>
  <div class="p-6 max-w-3xl mx-auto text-white">
    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
      📊 Resultado de la Predicción
    </h2>

    <div v-if="resultado && Object.keys(estadisticas.porcentajePorRaza).length">
      <h3 class="text-xl font-semibold mt-4">Sexo (%):</h3>
      <ul class="ml-4">
        <li>♂️ Male: {{ estadisticas.porcentajePorSexoPredicho?.Male || '0%' }}</li>
        <li>♀️ Female: {{ estadisticas.porcentajePorSexoPredicho?.Female || '0%' }}</li>
      </ul>

      <h3 class="text-xl font-semibold mt-4">Razas (%):</h3>
      <ul class="ml-4">
        <li v-for="(valor, raza) in estadisticas.porcentajePorRaza" :key="raza">
          🐾 {{ raza }}: {{ valor }}
        </li>
      </ul>

      <h3 class="text-xl font-semibold mt-4">Colores (%):</h3>
      <ul class="ml-4">
        <li v-for="(valor, color) in estadisticas.porcentajePorColor" :key="color">
          🎨 {{ color }}: {{ valor }}
        </li>
      </ul>

      <div class="mt-6">
        <h3 class="text-lg font-bold">🐱 Raza más adoptada:</h3>
        <p class="ml-4">{{ estadisticas.razaMasAdoptada }}</p>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-bold">🎭 Color más común:</h3>
        <p class="ml-4">{{ estadisticas.colorMasComun }}</p>
      </div>

      <!-- Predicciones individuales -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold mb-2">Predicciones individuales:</h3>
        <ul class="ml-4 list-disc">
          <li v-for="(pred, index) in resultado" :key="index">
            🐈 Raza: {{ pred.raza }}, 🎨 Color: {{ pred.color }}, ⚧️ Sexo: {{ pred.sexo }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="text-gray-300 mt-6 italic">
      No hay predicción aún. Sube un archivo .arff para comenzar.
    </div>

    <form @submit.prevent="handleSubmit" class="mt-8">
      <input
        type="file"
        accept=".arff"
        @change="handleFileChange"
        class="mb-4 text-black"
      />
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
        :disabled="!archivo"
      >
        Enviar archivo
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      archivo: null,
      resultado: null,
      estadisticas: {
        porcentajePorSexo: {},
        porcentajePorRaza: {},
        porcentajePorColor: {},
        razaMasAdoptada: '',
        colorMasComun: ''
      }
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.name.endsWith('.arff')) {
        this.archivo = file;
      } else {
        alert('Por favor selecciona un archivo .arff válido.');
        this.archivo = null;
      }
    },
    async handleSubmit() {
      if (!this.archivo) return;

      const formData = new FormData();
      formData.append('file', this.archivo);

      try {
        const response = await fetch('http://localhost:5000/api/predictor', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          this.resultado = data.predicciones; // ahora se llama predicciones, no resultado
          this.estadisticas = data.estadisticas;
          console.log('Estadisticas recibidas' , data.estadisticas);
        } else {
          alert(data.error || 'Error al procesar el archivo.');
        }
      } catch (error) {
        console.error('Error al enviar el archivo:', error);
        alert('Hubo un error al conectar con el servidor.');
      }
    }
  }
};
</script>

<style scoped>
body {
  background-color: #111827;
}
</style>
