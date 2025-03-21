<template>
  <div class="home-container">
    <!-- Sección Hero -->
    <section class="hero-section fade-in">
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
          <img src="../assets/images/fondohome.jpg" alt="Gato o perro en adopción" />
        </div>
      </div>
    </section>

    <!-- Sección Galería de Mascotas -->
    <section class="pets-gallery fade-in">
      <div class="container">
        <h2 class="section-title">Mascotas Esperando un Hogar</h2>
        <div class="pets-grid">
          <div v-for="pet in pets" :key="pet._id" class="pet-card">
            <PetCard :pet="pet" :showAdoptButton="isUser" @pet-deleted="removePet" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Proceso de Adopción -->
    <section class="adoption-process fade-in">
      <div class="container">
        <h2 class="section-title">Proceso de Adopción</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="step-icon">1</div>
            <h3>Explora</h3>
            <p>Navega por nuestra galería de mascotas y encuentra tu compañero ideal.</p>
          </div>
          <div class="process-step">
            <div class="step-icon">2</div>
            <h3>Contacta</h3>
            <p>Contáctanos para conocer más detalles sobre la mascota que te interesa.</p>
          </div>
          <div class="process-step">
            <div class="step-icon">3</div>
            <h3>Adopta</h3>
            <p>Completa nuestro proceso de adopción y lleva a tu nuevo amigo a casa.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PetCard from '../components/PetCard.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { PetCard },
  data() {
    return {
      pets: [],
      isUser: false
    };
  },
  methods: {
    async fetchPets() {
      try {
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
    this.fetchPets();
    this.checkUserRole();
    
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.3 });
    fadeEls.forEach(el => observer.observe(el));
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

:root {
  --primary-color: #FF6600;
  --secondary-color: #FFA07A;
  --text-color: #2C3E50;
  --background-color: #F4F6F9;
}

/* Contenedor general */
.home-container {
  font-family: 'Poppins', sans-serif;
  background-color: var(--background-color);
}

/* Sección Hero */
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
  flex-wrap: wrap;
}
.hero-text {
  flex: 1;
  padding-right: 3rem;
}
.hero-text h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--text-color);
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
  transition: transform 0.3s ease, background-color 0.3s ease;
}
.btn-adopt {
  background-color: white;
  color: var(--primary-color);
}
.btn:hover {
  transform: scale(1.05);
}
.hero-image {
  flex: 1;
  text-align: right;
  display: flex;
  justify-content: center;
}
.hero-image img {
  max-width: 450px;
  width: 100%;
  height: auto;
  border-radius: 20px; /* Bordes redondeados */
  transition: transform 0.3s ease;
}
.hero-image img:hover {
  transform: scale(1.05);
}

/* Pets Gallery */
.pets-gallery {
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
.pets-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

/* Adoption Process */
.adoption-process {
  background-color: var(--background-color);
  padding: 6rem 0;
}
.process-steps {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}
.process-step {
  flex: 1;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  max-width: 350px;
  margin: 0 auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.process-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.15);
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

/* Animación Fade In */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}
.fade-in.appear {
  opacity: 1;
  transform: translateY(0);
}

/* Responsivo */
@media (max-width: 768px) {
  .hero-content,
  .pets-grid,
  .process-steps {
    flex-direction: column;
    align-items: center;
  }
  .hero-text, .hero-image {
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
  .hero-image img {
    max-width: 300px;
  }
}
</style>
