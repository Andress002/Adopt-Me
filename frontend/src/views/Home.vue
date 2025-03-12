<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-text">
          <h1>Adopta un Gato o Perro, Cambia una Vida</h1>
          <p>Encuentra tu compañero peludo perfecto. Cada adopción es una historia de amor y esperanza.</p>
          <div class="hero-cta">
            <router-link to="/about" class="btn btn-adopt">Conoce Nuestra Historia</router-link>
          </div>
        </div>
        <div class="hero-image">
          <img src="../assets/images/Two little cutie pies_.jpeg" alt="Gato o perro en adopción" />
        </div>
      </div>
    </section>

    <section class="pets-gallery">
      <div class="container">
        <h2 class="section-title">Mascotas Esperando un Hogar</h2>
        <div class="pets-grid">
          <div 
            v-for="pet in pets" 
            :key="pet._id" 
            class="pet-card"
          >
            <PetCard 
              :pet="pet" 
              :showAdoptButton="isUser" 
              @pet-deleted="removePet" 
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Proceso de Adopción -->
    <section class="adoption-process">
      <div class="container">
        <h2 class="section-title">Proceso de Adopcion</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-icon">1</div>
            <h3>Explora</h3>
            <p>Navega por nuestra galeria de mascotas y encuentra tu compañero ideal.</p>
          </div>
          <div class="process-step">
            <div class="step-icon">2</div>
            <h3>Contacta</h3>
            <p>Contactanos para conocer más detalles sobre la mascota que te interesa.</p>
          </div>
          <div class="process-step">
            <div class="step-icon">3</div>
            <h3>Adopta</h3>
            <p>Completa nuestro proceso de adopcion y lleva a tu nuevo amigo a casa.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PetCard from '../components/PetCard.vue'; // Asegúrate de que el PetCard funcione para gatos y perros
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    PetCard
  },
  data() {
    return {
      pets: [], // Ahora tenemos una lista general de mascotas
      isUser: false
    };
  },
  methods: {
    async fetchPets() {
      try {
        // Llamada a la API para obtener tanto gatos como perros
        const response = await axios.get('http://localhost:5000/api/pets');
        this.pets = response.data;
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    },
    checkUserRole() {
      const user = JSON.parse(localStorage.getItem('user'));
      this.isUser = user && user.role !== 'admin';
    },
    removePet(petId) {
      this.pets = this.pets.filter(pet => pet._id !== petId);
    }
  },
  mounted() {
    this.fetchPets(); // Ahora obtienes tanto gatos como perros
    this.checkUserRole();
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

:root {
  --primary-color: #6A5ACD;
  --secondary-color: #8A4FFF;
  --text-color: #2C3E50;
  --background-color: #F4F6F9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  font-family: 'Poppins', sans-serif;
  background-color: var(--background-color);
}

.hero-section {
  position: relative;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 6rem 0;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
}

.hero-text {
  flex: 1;
  padding-right: 3rem;
}

.hero-text h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-text p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-cta {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-adopt {
  background-color: white;
  color: var(--primary-color);
}

.btn-explore {
  background-color: transparent;
  border: 2px solid white;
  color: white;
}

.btn:hover {
  transform: scale(1.05);
}

.hero-image {
  flex: 1;
  text-align: right;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.cats-gallery, .adoption-process {
  padding: 6rem 0;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-color);
}

.cats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.adoption-process {
  background-color: var(--background-color);
}

.process-steps {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.process-step {
  flex: 1;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.step-icon {
  width: 70px;
  height: 70px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .hero-content,
  .cats-grid,
  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .hero-text, 
  .hero-image {
    flex: none;
    width: 100%;
    text-align: center;
    padding-right: 0;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-text p {
    font-size: 1.2rem;
  }
}

.pets-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* Asegura que las tarjetas se centren */
}


</style>