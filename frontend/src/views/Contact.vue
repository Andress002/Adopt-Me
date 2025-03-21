<template>
  <div class="contact-container">
    <div class="contact-wrapper">
      <div class="contact-info">
        <h2>Contáctanos</h2>
        <p>¿Tienes preguntas sobre adopción? Estamos aquí para ayudarte.</p>
        <div class="contact-details">
          <div class="contact-detail">
            <i class="icon-phone" aria-label="Teléfono"></i>
            <span>3105923760</span>
          </div>
          <div class="contact-detail">
            <i class="icon-mail" aria-label="Correo Electrónico"></i>
            <span>MundoGatuno@gmail.com</span>
          </div>
          <div class="contact-detail">
            <i class="icon-location" aria-label="Ubicación"></i>
            <span>Cartagena, Colombia</span>
          </div>
        </div>
      </div>
      <div class="contact-form">
        <form @submit.prevent="handleForm">
          <div class="form-group">
            <div class="input-wrapper">
              <input
                id="name"
                type="text"
                v-model="name"
                placeholder=" "
                required
              />
              <label for="name">Nombre Completo</label>
              <i class="icon-user"></i>
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder=" "
                required
              />
              <label for="email">Correo Electrónico</label>
              <i class="icon-envelope"></i>
            </div>
          </div>

          <div class="form-group">
            <div class="input-wrapper">
              <textarea
                id="message"
                v-model="message"
                placeholder=" "
                rows="4"
                required
              ></textarea>
              <label for="message">Tu Mensaje</label>
              <i class="icon-chat"></i>
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
    validateInput() {
      if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
        this.$swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor, rellena todos los campos antes de enviar.',
          confirmButtonColor: '#6A5ACD',
        });
        return false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.$swal.fire({
          icon: 'warning',
          title: 'Email inválido',
          text: 'Por favor, ingresa un correo válido.',
          confirmButtonColor: '#6A5ACD',
        });
        return false;
      }
      return true;
    },
    async handleForm() {
      if (!this.validateInput()) return;
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
          confirmButtonColor: '#6A5ACD',
        });
        this.name = '';
        this.email = '';
        this.message = '';
      } catch (error) {
        const errorMsg = error.response?.data?.message || 'Error desconocido al enviar el mensaje.';
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMsg,
          confirmButtonColor: '#6A5ACD',
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1100px;
  width: 100%;
}

.contact-info {
  flex: 1;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  animation: gradientShift 5s infinite alternate;
  color: white;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
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
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.contact-detail:hover {
  transform: translateY(-5px);
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
  position: relative;
}

label {
  position: absolute;
  top: 12px;
  left: 40px;
  font-size: 0.9rem;
  color: gray;
  transition: 0.3s ease;
  pointer-events: none;
}

input, textarea {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus + label, textarea:focus + label,
input:not(:placeholder-shown) + label, textarea:not(:placeholder-shown) + label {
  top: -10px;
  left: 20px;
  font-size: 0.75rem;
  color: var(--primary-color);
}

input:focus, textarea:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 10px rgba(138, 79, 255, 0.5);
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
  transition: transform 0.3s ease, background 0.3s ease;
}

.btn-submit:hover {
  background: var(--secondary-color);
  transform: scale(1.05);
}

@media (max-width: 480px) {
  .contact-wrapper {
    flex-direction: column;
    border-radius: 0;
  }

  .contact-info {
    text-align: center;
    padding: 2rem;
  }
}
</style>
