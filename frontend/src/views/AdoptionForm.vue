<template>
  <div class="contact-container">
    <div class="contact-wrapper">
      
      <div class="contact-info">
        <h2>Formulario de Adopcion</h2>
        <p>Completa los datos a continuacion para solicitar la adopcion.</p>
        <ul>
          <li><strong>Teléfono:</strong>310593760</li>
          <li><strong>Correo:</strong> info@adopciondegatos.com</li>
          <li><strong>Ubicación:</strong> Cartagena, Colombia</li>
        </ul>
      </div>

      <!-- Formulario de adopción -->
      <div class="contact-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nombre completo</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Correo electronico</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Tu correo"
              required
            />
          </div>
          <div class="form-group">
            <label for="phone">Telefono</label>
            <input
              id="phone"
              v-model="phone"
              type="text"
              class="form-control"
              placeholder="Tu teléfono"
              required
            />
          </div>
          <div class="form-group">
            <label for="address">Direccion</label>
            <input
              id="address"
              v-model="address"
              type="text"
              class="form-control"
              placeholder="Tu dirección"
              required
            />
          </div>
          <div class="form-group">
            <label for="dni">Cedula</label>
            <input
              id="dni"
              v-model="dni"
              type="number"
              class="form-control"
              placeholder="Tu cedula"
              required
            />
          </div>
          <div class="form-group">
            <label for="reason">Motivo Para adoptar</label>
            <textarea
              id="reason"
              v-model="reason"
              class="form-control"
              placeholder="Motivo para adoptar"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-100">Enviar solicitud</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'AdoptionForm',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      reason: '',
      dni: '',
      catId: null,
    };
  },
  mounted() {
    this.catId = this.$route.params.catId;
  },
  methods: {
    async handleSubmit() {
      const adoptionData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        reason: this.reason,
        dni: this.dni,
        catId: this.catId,
      };
      try {
        const response = await axios.post('http://localhost:5000/api/adoption', adoptionData);
        console.log('Respuesta del servidor:', response.data);
        alert(response.data.message || '¡Solicitud enviada con éxito!, te estaremos contactando con usted muy pronto ...');
        this.resetForm();
        this.$router.push('/');
      } catch (error) {
        console.error('Error al enviar la solicitud de adopcion:', error);
        alert('Hubo un error al enviar la solicitud de adopcion.');
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.reason = '';
      this.dni = ''
    },
  },
};
</script>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #394a6d, #f4f6f9);
  padding: 2rem;
}

.contact-wrapper {
  display: flex;
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.contact-info {
  flex: 1;
  background: linear-gradient(135deg, #394a6d, #6c8baf);
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.contact-info h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.contact-info p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.contact-info ul {
  list-style: none;
  padding: 0;
  font-size: 1rem;
}

.contact-info li {
  margin-bottom: 0.8rem;
}

.contact-form {
  flex: 1;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

input,
textarea {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 10px;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #f9f9f9;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #394a6d;
  box-shadow: 0 0 5px rgba(57, 74, 109, 0.5);
}

button {
  background-color: #394a6d;
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #6c8baf;
}

button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(57, 74, 109, 0.5);
}
</style>
