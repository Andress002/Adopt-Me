<template>
  <div class="about-container">
    <!-- Sección Hero -->
    <section class="hero fade-in">
      <div class="hero-content">
        <h1>Sobre Nosotros</h1>
        <p class="tagline">Transformando vidas, un hogar a la vez</p>
        <p>En Mundo Gatuno, creemos que cada animal merece amor, cuidado y un hogar donde pueda florecer. Nuestra misión es hacer que la adopción responsable sea una experiencia significativa y llena de alegría.</p>
        <div class="hero-cta">
          <a href="#why-adopt" class="btn btn-cta">Descubre Más</a>
          <a href="#testimonials" class="btn btn-cta">Historias de Éxito</a>
        </div>
      </div>
    </section>

    <div class="section-separator"></div>

    <!-- Sección Misión -->
    <section class="mission fade-in">
      <div class="section-content">
        <h2>Nuestra Misión</h2>
        <div class="section-divider"></div>
        <p>
          En Mundo Gatuno, nuestra pasión es conectar corazones y hogares. No solo rescatamos gatos y perros, sino que también les brindamos una segunda oportunidad, asegurándonos de que encuentren familias que los amen y los cuiden para siempre.
        </p>
        <p>
          Nos esforzamos por educar a la comunidad sobre la importancia de la adopción responsable, la esterilización y el respeto hacia los animales. Creemos que cada pequeño acto de bondad puede generar un cambio enorme en la vida de estos seres maravillosos.
        </p>
      </div>
    </section>

    <div class="section-separator"></div>

    <!-- Sección ¿Por Qué Adoptar? -->
    <section id="why-adopt" class="why-adopt fade-in">
      <div class="section-content">
        <h2>¿Por Qué Adoptar?</h2>
        <div class="section-divider"></div>
        <p>La adopción de un gato o un perro es más que simplemente llevar un nuevo amigo a casa: es un acto de amor, compasión y compromiso. Aquí te contamos por qué adoptar es una de las mejores decisiones que puedes tomar:</p>
        <div class="reasons-grid">
          <div class="reason-card">
            <img src="../assets/images/adopt1.jpg" alt="Razón 1">
            <h3>Amor Incondicional</h3>
            <p>Los animales adoptados crean lazos inquebrantables con sus familias. Su gratitud y cariño son infinitos, y cada día te recordarán lo especial que eres para ellos.</p>
          </div>
          <div class="reason-card">
            <img src="../assets/images/adopt2.jpg" alt="Razón 2">
            <h3>Salvar una Vida</h3>
            <p>Muchos animales en refugios han sufrido el abandono o el maltrato. Al adoptar, no solo les das un hogar, sino también la oportunidad de vivir una vida digna y feliz.</p>
          </div>
          <div class="reason-card">
            <img src="../assets/images/adopt3.jpg" alt="Razón 3">
            <h3>Haces un Impacto Positivo</h3>
            <p>Al adoptar, ayudas a reducir la sobrepoblación en refugios y promueves una cultura de respeto y cuidado hacia los animales.</p>
          </div>
        </div>
        <p>Si estás listo para cambiar una vida y permitir que la tuya también se transforme, la adopción es el camino ideal.</p>
      </div>
    </section>

    <div class="section-separator"></div>

    <!-- Sección Testimonios -->
    <section id="testimonials" class="testimonials fade-in">
      <div class="section-content">
        <h2>Historias de Adopción</h2>
        <div class="section-divider"></div>
        <p>Cada adopción es un nuevo comienzo, una oportunidad para escribir una historia llena de amor y esperanza. Conoce a algunas familias que han abierto sus corazones a un amigo peludo y han cambiado sus vidas para siempre.</p>
        <div class="testimonial-carousel">
          <div class="testimonial-card">
            <img src="../assets/images/testimonio1.jpg" alt="Juan y María">
            <blockquote>
              "Adoptar a nuestro gato Simba ha sido una de las mejores decisiones de nuestras vidas. Nos llena de alegría con sus travesuras y nos acompaña en cada momento. Gracias a Mundo Gatuno por hacer posible este encuentro."
            </blockquote>
            <p class="testimonial-author">- Juan y María</p>
          </div>
          <div class="testimonial-card">
            <img src="../assets/images/testimonio2.jpg" alt="Laura">
            <blockquote>
              "Nunca pensé cuánto amor podía traer un gato a nuestra vida hasta que adoptamos a Luna. Desde el primer día, sentimos su gratitud y cariño. La adopción nos ha cambiado en formas que nunca imaginamos."
            </blockquote>
            <p class="testimonial-author">- Laura</p>
          </div>
        </div>
        <p>Estas son solo algunas de las muchas historias de éxito que nos motivan a seguir adelante. ¿Te gustaría ser la próxima?</p>
      </div>
    </section>
  </div>
</template>


<style scoped>
:root {
  --primary-color: #FF6600;
  --secondary-color: #FFA07A;
  --text-color: #2C3E50;
  --background-color-light: #FFFFFF;
  --background-color-dark: #F8F9FA;
}

/* Estilos generales */
.about-container {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  scroll-behavior: smooth;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
  padding: 6rem 2rem;
  background-attachment: fixed;
  border-radius: 0 0 20px 20px;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
}

.hero-cta {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-cta {
  background-color: var(--secondary-color);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.btn-cta:hover {
  box-shadow: 0 0 20px rgba(255, 160, 122, 0.5);
  transform: scale(1.05);
}

/* Fondo de secciones */
section {
  background-color: #f2f2f2;
  padding: 3rem 1rem;
  border-radius: 8px;
}

/* Alternar colores en secciones */
section:nth-child(even) {
  background-color: #e6e6e6;
}

/* Separador entre secciones */
.section-separator {
  width: 100%;
  height: 20px;
  background: var(--background-color-dark);
}

/* Divider para cada sección */
.section-divider {
  width: 80px;
  height: 4px;
  background: var(--primary-color);
  margin: 2rem auto;
  border-radius: 2px;
}

/* Estilo de tarjetas de razones */
.reasons-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.reason-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 320px; /* Se amplió un poco el ancho */
  min-height: 250px; /* Permite que crezca si el texto es largo */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden; /* Evita que el contenido se desborde */
}

/* Corregir la visibilidad de los números de razón */
.reason-card h3 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1.4rem;
  flex-wrap: wrap; /* Permite que el texto pase a otra línea si es necesario */
  word-wrap: break-word; /* Asegura que las palabras largas se dividan correctamente */
  text-align: center;
}

/* Agregar números automáticamente */
.reason-card h3::before {
  content: counter(reason-counter) ".";
  counter-increment: reason-counter;
  font-weight: bold;
  color: var(--primary-color);
  font-size: 1.6rem;
  min-width: 28px;
  text-align: right;
}

/* Reiniciar contador en la lista */
.reasons-grid {
  counter-reset: reason-counter;
}

/* Imágenes redondas y del mismo tamaño */
.testimonial-card img,
.reason-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

/* Ajuste para móviles */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .testimonial-card img,
  .reason-card img {
    width: 90px;
    height: 90px;
  }

  .reason-card {
    width: 100%;
    min-height: auto; /* Permite que las tarjetas sean más flexibles */
  }
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

.section-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1rem;
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
