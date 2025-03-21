<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Inicio</router-link>
        <router-link to="/about">Sobre Nosotros</router-link>
        <router-link to="/contact">Contacto</router-link>
        <router-link v-if="authState.isAuthenticated && authState.userRole === 'admin'" to="/admin">
          Administrador
        </router-link>
        <div class="auth-links">
          <router-link v-if="!authState.isAuthenticated" to="/login" class="auth-link">
            Iniciar Sesión
          </router-link>
          <router-link v-if="!authState.isAuthenticated" to="/register" class="auth-link">
            Registrar
          </router-link>
          <button v-if="authState.isAuthenticated" @click="logout" class="auth-link">
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 Adopción de Gatos. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
import authState from "./authState";

export default {
  setup() {
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      authState.isAuthenticated = false;
      authState.userRole = "user";
    };

    

    return {
      authState,
      logout,
    };
  },
};
</script>


<style>
:root {
  --primary-color: #353839; /* Gris oscuro para el header */
  --secondary-color: #E5E5E5; /* Blanco Oscuro (Gris Claro) */
  --link-hover-color: #D44D4D; /* Rojo suave al pasar el mouse */
  --button-bg: #D44D4D; /* Rojo suave para los botones */
  --button-hover-bg: #820e0e; /* Rojo más oscuro al pasar el mouse */
  --header-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra suave en el header */
}

#app {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--background-color);
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--primary-color);
  padding: 20px;
  box-shadow: var(--header-shadow); /* Sombra en el header */
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  margin: 0 15px;
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.auth-links {
  display: flex;
  gap: 10px;
}

.auth-link {
  font-size: 0.9rem;
  padding: 10px 15px;
  border-radius: 20px; /* Borde redondeado */
  background-color: var(--button-bg);
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.auth-link:hover {
  background-color: var(--button-hover-bg);
  transform: scale(1.05); /* Efecto de escala al pasar el mouse */
}

nav a:hover {
  color: var(--link-hover-color);
}

footer {
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 10px 0;
  margin-top: auto;
}
</style>

