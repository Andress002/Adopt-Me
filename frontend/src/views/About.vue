<template>
  <div class="about-container">
    <!-- Sección Hero -->
    <section class="hero fade-in">
      <div class="hero-content">
        <h1>Sobre Nosotros</h1>
        <p class="tagline">Cambiando vidas, un gato a la vez</p>
      </div>
    </section>

    <!-- Sección Misión -->
    <section class="mission fade-in">
      <div class="section-content">
        <h2>Nuestra Misión</h2>
        <p>
          En Mundo Gatuno, transformamos esperanza en hogar. Cada gato merece amor, 
          seguridad y una familia que lo acoja con los brazos abiertos. Trabajamos incansablemente 
          para convertir momentos de soledad en historias de conexión y cariño.
        </p>
      </div>
    </section>

    <!-- Sección ¿Por Qué Adoptar? -->
    <section class="why-adopt fade-in">
      <div class="section-content">
        <h2>¿Por Qué Adoptar?</h2>
        <div class="reasons-grid">
          <div class="reason-card">
            <i class="icon heart"></i>
            <h3>Amor Incondicional</h3>
            <p>Los gatos ofrecen compañía y cariño sin límites.</p>
          </div>
          <div class="reason-card">
            <i class="icon home"></i>
            <h3>Segundo Hogar</h3>
            <p>Cada adopción es una nueva oportunidad de vida.</p>
          </div>
          <div class="reason-card">
            <i class="icon community"></i>
            <h3>Impacto Social</h3>
            <p>Ayudas a reducir la población de animales sin hogar.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Valores -->
    <section class="values fade-in">
      <div class="section-content">
        <h2>Nuestros Valores</h2>
        <ul class="values-list">
          <li>
            <span class="value-icon">💖</span>
            <strong>Cuidado y Compasión</strong>
            <p>Cada gato recibe amor y atención personalizada.</p>
          </li>
          <li>
            <span class="value-icon">🤝</span>
            <strong>Transparencia</strong>
            <p>Comunicación clara y honesta en cada paso.</p>
          </li>
          <li>
            <span class="value-icon">🏠</span>
            <strong>Compromiso</strong>
            <p>Dedicación total para encontrar el hogar perfecto.</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Sección Testimonios -->
    <section class="testimonials fade-in">
      <div class="section-content">
        <h2>Historias de Adopción</h2>
        <div class="testimonial-carousel">
          <div class="testimonial-card">
            <img src="../assets/images/testimonio1.jpg" alt="Juan y María">
            <blockquote>
              "Adoptar a nuestro gato ha sido transformador. El equipo nos guió con profesionalismo y amor."
            </blockquote>
            <p class="testimonial-author">- Juan</p>
          </div>
          <div class="testimonial-card">
            <img src="../assets/images/testimonio2.jpg" alt="Laura">
            <blockquote>
              "Nuestro nuevo amigo peludo ha llenado de alegría nuestro hogar. ¡Gracias Mundo Gatuno!"
            </blockquote>
            <p class="testimonial-author">- Laura</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #FF6600; /* Naranja principal */
  --secondary-color: #FFA07A; /* Naranja suave */
  --text-color: #2C3E50; /* Texto oscuro */
  --background-color-light: #FFFFFF; /* Blanco puro */
  --background-color-dark: #F4F6F9; /* Blanco más oscuro */
}

.about-container {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
  padding: 6rem 2rem;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
}

.hero-content .tagline {
  font-size: 1.5rem;
}

/* Alternancia de fondos */
section:nth-child(odd) {
  background-color: var(--background-color-light);
}

section:nth-child(even) {
  background-color: var(--background-color-dark);
}

/* Contenido general */
.section-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.reason-card {
  background: white;
  padding: 2rem;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.reason-card img {
  width: 80%;
  border-radius: 10px;
}

.values-list {
  display: flex;
  justify-content: space-between;
}

.values-list li {
  flex: 1;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  margin: 0 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.testimonial-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
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
  .reasons-grid {
    grid-template-columns: 1fr;
  }
  .values-list {
    flex-direction: column;
  }
}
</style>

<script>
export default {
  mounted() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.3 });
    elements.forEach(el => observer.observe(el));
  }
};
</script>
