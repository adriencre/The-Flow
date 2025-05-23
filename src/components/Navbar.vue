<template>
  <nav class="navbar">
    <div class="logo-container">
      <router-link to="/">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>
    
    <!-- Menu hamburger pour mobile -->
    <div class="menu-toggle" @click="toggleMenu" :class="{ 'active': menuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </div>
    
    <!-- Menu de navigation -->
    <ul :class="{ 'open': menuOpen }">
      <li><router-link to="/" @click="closeMenu">Accueil</router-link></li>
      <li><router-link to="/projets" @click="closeMenu">Projets</router-link></li>
      <li><router-link to="/contact" @click="closeMenu">Contact</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

// État pour le menu mobile
const menuOpen = ref(false);

// Fonction pour basculer l'état du menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  
  // Empêcher le défilement du body quand le menu est ouvert
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Fonction pour fermer le menu après avoir cliqué sur un lien
const closeMenu = () => {
  menuOpen.value = false;
  document.body.style.overflow = '';
};
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
  z-index: 1000; /* Augmenter le z-index pour s'assurer que le menu est au-dessus de tout */
}

.logo-container {
  display: flex;
  align-items: center;
  z-index: 1001; /* Logo toujours visible */
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

.navbar ul li a:hover {
  color: #C8A96A;
}

/* Menu hamburger - caché par défaut sur desktop */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 1001; /* Au-dessus du menu */
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: #F2EFEA;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Animation du menu hamburger */
.menu-toggle.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar {
    position: fixed; /* Fixe pour rester en haut de l'écran */
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 1rem 2rem;
    background-color: transparent; /* Pas de fond */
    box-shadow: none;
    z-index: 1500; /* S'assurer que la navbar est au-dessus de tout */
  }
  
  .logo {
    height: 60px; /* Logo plus petit sur mobile */
  }
  
  /* Afficher le menu hamburger */
  .menu-toggle {
    display: flex;
  }
  
  /* Cacher le menu par défaut */
  .navbar ul {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(28, 28, 28, 0.98);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 999;
  }
  
  /* Afficher le menu quand il est ouvert */
  .navbar ul.open {
    transform: translateX(0);
  }
  
  .navbar ul li a {
    font-size: 18px; /* Texte plus grand sur mobile */
    padding: 1rem;
    display: block;
  }
}

/* Ajustements pour les très petits écrans */
@media (max-width: 480px) {
  .navbar {
    padding: 0.8rem 1.5rem;
  }
  
  .logo {
    height: 50px;
  }
}
</style>
