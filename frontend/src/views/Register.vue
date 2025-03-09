<template>
  <div class="register-container">
    <h2>Registro</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Nombre de Usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <!-- <div>
        <label for="role">Rol:</label>
        <select v-model="role" id="role">
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div> -->
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import authState from '../authState'; // Importamos el estado global de autenticación

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: 'user',
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role,
        });

        // Guardamos el token y el rol en el almacenamiento local
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ role: this.role }));

        // Actualizamos el estado de autenticación
        authState.isAuthenticated = true;
        authState.userRole = this.role;

        alert('Registro exitoso!');
        this.$router.push('/');
      } catch (error) {
        console.error('Error al registrarse:', error.response?.data || error);
        alert('Error al registrarse');
      }
    },
  },
};
</script>





<style scoped>
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input, select {
    width: 90%;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  button {
    width: 90%;
    padding: 0.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>
