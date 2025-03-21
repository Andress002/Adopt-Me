<template>
  <div class="adoption-container">
    <div class="adoption-wrapper">
      <!-- Panel de información de la mascota -->
      <div class="pet-details" v-if="pet">
        <img
          :src="pet.image ? `http://localhost:5000/uploads/${pet.image}` : '../assets/images/default-pet.jpg'"
          alt="Mascota a adoptar"
          class="pet-image"
        />
        <h2 class="pet-name">{{ pet.name }}</h2>
        <p class="pet-description">{{ pet.description }}</p>
        <ul class="pet-info-list">
          <li><strong>Edad:</strong> {{ pet.age }} años</li>
          <li><strong>Vacunado:</strong> {{ pet.vaccinated ? 'Sí' : 'No' }}</li>
          <li><strong>Tamaño:</strong> {{ getSizeLabel(pet.size) }}</li>
        </ul>
      </div>

      <!-- Formulario de adopción -->
      <div class="contact-form">
        <h2>Formulario de Adopción</h2>
        <p>Completa los datos a continuación para solicitar la adopción.</p>
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
            <label for="email">Correo electrónico</label>
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
            <label for="phone">Teléfono</label>
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
            <label for="address">Dirección</label>
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
            <label for="dni">Cédula</label>
            <input
              id="dni"
              v-model="dni"
              type="number"
              class="form-control"
              placeholder="Tu cédula"
              required
            />
          </div>
          <div class="form-group">
            <label for="reason">Motivo para adoptar</label>
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

    
    <div class="contact-info">
      <h3>Contáctanos</h3>
      <ul>
        <li><strong>Teléfono:</strong> 3103933668</li>
        <li><strong>Correo:</strong> info@adopciondegatos.com</li>
        <li><strong>Ubicación:</strong> Cartagena, Colombia</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdoptionForm',
  props: ['petId', 'petType'],
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      reason: '',
      dni: '',
      petId: null,
      petType: '',
      pet: null
    };
  },
  mounted() {
    this.petId = this.$route.params.petId;
    this.petType = this.$route.params.petType;
    if (this.petId) {
      this.fetchPetDetails();
    }
  },
  methods: {
    async fetchPetDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${this.petId}`);
        this.pet = response.data;
      } catch (error) {
        console.error('Error al obtener detalles de la mascota:', error);
      }
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
    },
    async handleSubmit() {
      const adoptionData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        reason: this.reason,
        dni: this.dni,
        petId: this.petId,
        petType: this.petType
      };
      try {
        const response = await axios.post('http://localhost:5000/api/adoption', adoptionData);
        console.log('Respuesta del servidor:', response.data);
        alert(response.data.message || '¡Solicitud enviada con éxito! Te estaremos contactando muy pronto.');
        this.resetForm();
        this.$router.push('/');
      } catch (error) {
        console.error('Error al enviar la solicitud de adopción:', error);
        alert('Hubo un error al enviar la solicitud de adopción.');
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.reason = '';
      this.dni = '';
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.adoption-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, #394a6d, #f4f6f9);
  padding: 2rem;
  min-height: 100vh;
}

.adoption-wrapper {
  display: flex;
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

/* Panel de Información de la Mascota */
.pet-details {
  flex: 1;
  background: linear-gradient(135deg, #394a6d, #6c8baf);
  color: white;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pet-image {
  width: 100%;
  max-width: 250px;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.pet-name {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}
.pet-description {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.pet-info-list {
  list-style: none;
  padding: 0;
  font-size: 0.95rem;
  text-align: left;
}
.pet-info-list li {
  margin-bottom: 0.5rem;
}

/* Formulario de Adopción */
.contact-form {
  flex: 1;
  padding: 2rem;
  background: #f9f9f9;
}
.contact-form h2 {
  margin-bottom: 1rem;
}
.contact-form p {
  margin-bottom: 1.5rem;
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
  background-color: #fff;
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

/* Información de contacto adicional */
.contact-info {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  max-width: 900px;
  width: 100%;
  text-align: center;
}
.contact-info h3 {
  margin-bottom: 1rem;
}
.contact-info ul {
  list-style: none;
  padding: 0;
}
.contact-info li {
  margin-bottom: 0.8rem;
  font-size: 1rem;
}

/* Animación y Responsividad */
@media (max-width: 768px) {
  .adoption-wrapper {
    flex-direction: column;
  }
}

</style>
