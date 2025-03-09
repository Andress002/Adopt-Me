<template>
  <div class="about-container">
    <section class="hero">
      <div class="hero-content">
        <h1>Adopción de Gatos</h1>
        <p class="tagline">Cambiando vidas, un gato a la vez</p>
      </div>
    </section>

    <section class="mission">
      <div class="section-content">
        <h2>Nuestra Mision</h2>
        <p>
          En Adopcion de Gatos, transformamos esperanza en hogar. Cada gato merece amor, 
          seguridad y una familia que lo acoja con los brazos abiertos. Trabajamos incansablemente 
          para convertir momentos de soledad en historias de conexiin y cariño.
        </p>
      </div>
    </section>

    <section class="why-adopt">
      <div class="section-content">
        <h2>¿Por Qué Adoptar?</h2>
        <div class="reasons-grid">
          <div class="reason-card">
            <i class="icon heart"></i>
            <h3>Amor Incondicional</h3>
            <p>Los gatos ofrecen compañia y cariño sin limites.</p>
          </div>
          <div class="reason-card">
            <i class="icon home"></i>
            <h3>Segundo Hogar</h3>
            <p>Cada adopcion es una nueva oportunidad de vida.</p>
          </div>
          <div class="reason-card">
            <i class="icon community"></i>
            <h3>Impacto Social</h3>
            <p>Ayudas a reducir la población de animales sin hogar.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="values">
      <div class="section-content">
        <h2>Nuestros Valores</h2>
        <ul class="values-list">
          <li>
            <span class="value-icon">💖</span>
            <strong>Cuidado y Compasion</strong>
            <p>Cada gato recibe amor y atención personalizada.</p>
          </li>
          <li>
            <span class="value-icon">🤝</span>
            <strong>Transparencia</strong>
            <p>Comunicacion clara y honesta en cada paso.</p>
          </li>
          <li>
            <span class="value-icon">🏠</span>
            <strong>Compromiso</strong>
            <p>Dedicacion total para encontrar el hogar perfecto.</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="testimonials">
      <div class="section-content">
        <h2>Historias de Adopcion</h2>
        <div class="testimonial-carousel">
          <div class="testimonial-card">
            <img src="../assets/images/testimonio1.jpg" alt="Juan y María">
            <blockquote>
              "Adoptar a nuestro gato ha sido transformador. El equipo nos guio con profesionalismo y amor."
            </blockquote>
            <p class="testimonial-author">- Juan </p>
          </div>
          <div class="testimonial-card">
            <img src="../assets/images/testimonio2.jpg" alt="Laura">
            <blockquote>
              "Nuestro nuevo amigo peludo ha llenado de alegria nuestro hogar. ¡Gracias Mundo Gatuno!"
            </blockquote>
            <p class="testimonial-author">- Laura</p>
          </div>
        </div>
      </div>
    </section>

    <section class="analysis-table">
      <div class="section-content">
        <h2>Tabla de Analisis</h2>
        <img src="../assets/images/datosImportantess.JPG" alt="Tabla de analisis">

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
}
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

.about-container {
  font-family: 'Poppins', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.section-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
  padding: 6rem 2rem;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-content .tagline {
  font-size: 1.5rem;
  opacity: 0.9;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
  position: relative;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 100px;
  height: 4px;
  background: var(--primary-color);
  transform: translateX(-50%);
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
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.reason-card:hover {
  transform: translateY(-10px);
}

.values-list {
  display: flex;
  justify-content: space-between;
  list-style: none;
}

.values-list li {
  flex: 1;
  text-align: center;
  padding: 1.5rem;
  background: white;
  margin: 0 1rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.testimonial-carousel {
  display: flex;
  gap: 2rem;
}

.testimonial-card {
  flex: 1;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.testimonial-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.analysis-table img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .reasons-grid, 
  .values-list, 
  .testimonial-carousel {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
}
</style>