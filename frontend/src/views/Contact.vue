<template>
  <div class="contact-container">
    <div class="contact-wrapper">
      <div class="contact-info">
        <h2>Contáctanos</h2>
        <p>¿Tienes preguntas sobre adopción? Estamos aqui para ayudarte.</p>
        <div class="contact-details">
          <div class="contact-detail">
            <i class="icon-phone"></i>
            <span>3105923760</span>
          </div>
          <div class="contact-detail">
            <i class="icon-mail"></i>
            <span>MundoGatuno@gmail.com</span>
          </div>
          <div class="contact-detail">
            <i class="icon-location"></i>
            <span>Cartagena, Colombia</span>
          </div>
        </div>
      </div>
      <div class="contact-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nombre Completo</label>
            <div class="input-wrapper">
              <i class="icon-user"></i>
              <input
                id="name"
                type="text"
                v-model="name"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Correo Electronico</label>
            <div class="input-wrapper">
              <i class="icon-envelope"></i>
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Ingresa tu email"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="message">Tu Mensaje</label>
            <div class="input-wrapper">
              <i class="icon-chat"></i>
              <textarea
                id="message"
                v-model="message"
                placeholder="Escribe tu mensaje"
                rows="4"
                required
              ></textarea>
            </div>
          </div>
          
          <button type="submit" class="btn-submit">
            <span>Enviar Mensaje</span>
            <i class="icon-send"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Contact',
  data() {
    return {
      name: '',
      email: '',
      message: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post('http://localhost:5000/api/contact', {
          name: this.name,
          email: this.email,
          message: this.message,
        });
        this.$swal.fire({
          icon: 'success',
          title: `Gracias, ${this.name}`,
          text: 'Tu mensaje ha sido enviado exitosamente',
          confirmButtonColor: '#6A5ACD'
        });
        this.name = '';
        this.email = '';
        this.message = '';
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error al enviar el mensaje. Intentalo nuevamente.',
          confirmButtonColor: '#6A5ACD'
        });
      }
    },
  },
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

.contact-container {
  font-family: 'Poppins', sans-serif;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.contact-wrapper {
  display: flex;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  max-width: 1100px;
  width: 100%;
}

.contact-info {
  flex: 1;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-info h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.contact-details {
  margin-top: 2rem;
}

.contact-detail {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.contact-detail i {
  margin-right: 1rem;
  font-size: 1.5rem;
}

.contact-form {
  flex: 1;
  padding: 4rem 3rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.input-wrapper {
  position: relative;
}

.input-wrapper i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
  opacity: 0.7;
}

input, textarea {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.1);
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background: var(--secondary-color);
}

@media (max-width: 768px) {
  .contact-wrapper {
    flex-direction: column;
  }
}
</style>