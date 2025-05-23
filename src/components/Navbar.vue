<template>
  <nav class="navbar">
    <div class="logo-container">
      <router-link to="/">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/projets">Projets</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
// Aucune logique nécessaire pour ce composant simple
</script>

<style scoped>
.navbar {
  position: absolute;
  top: 0;
  left: 2rem;
  right: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 80px;
  width: auto;
}

.navbar ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.navbar ul li a {
  color: #F2EFEA;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}


/* Responsive design */
@media (max-width: 768px) {
  .navbar {
    position: relative;
    top: 1rem;
    right: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}
</style>
