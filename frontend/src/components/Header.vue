<template>
  <header>
    <h1>Adopción de Gatos</h1>
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/about">Sobre Nosotros</router-link>
      <router-link to="/contact">Contacto</router-link>
      <router-link v-if="authState.userRole === 'admin'" to="/admin">Administrador</router-link>
      <router-link v-if="!authState.isAuthenticated" to="/register">Registrarse</router-link>
      <router-link v-if="!authState.isAuthenticated" to="/login">Iniciar Sesión</router-link>
      <button v-if="authState.isAuthenticated" @click="logout">Cerrar Sesión</button>
    </nav>
  </header>
</template>

<script>
import authState from '../authState'; // Importa el estado reactivo

export default {
  setup() {
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      authState.isAuthenticated = false;
      authState.userRole = 'user';
    };

    return {
      authState,
      logout,
    };
  },
};
</script>





