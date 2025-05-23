<template>
  <!-- Hero Section pour la page Projets -->
  <section class="projects-hero-section">
    <Navbar />
    
    <div class="projects-hero-content">
      <h1>Nos Projets</h1>
      <p>Découvrez notre galerie de chefs-d'œuvre numériques</p>
    </div>
  </section>
  
  <!-- Section Projets Détaillés -->
  <section class="projects-detailed-section">
    <div class="projects-filter">
      <button class="filter-button active" data-filter="all" @click="filterProjects('all', $event)">Tous</button>
      <button class="filter-button" data-filter="web" @click="filterProjects('web', $event)">Web</button>
      <button class="filter-button" data-filter="mobile" @click="filterProjects('mobile', $event)">Mobile</button>
      <button class="filter-button" data-filter="design" @click="filterProjects('design', $event)">Design</button>
    </div>
    
    <div class="projects-container">
      <router-link 
        v-for="project in filteredProjects" 
        :key="project.id" 
        :to="`/projet/${project.slug}`" 
        class="project-card"
      >
        <div class="project-image-container">
          <img :src="project.image" :alt="project.title" class="project-image">
        </div>
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-category">{{ project.category }}</p>
      </router-link>
    </div>
  </section>
  
  <!-- Section Contact (version simplifiée) -->
  <section class="projects-contact-section">
    <h2>Vous avez un projet en tête ?</h2>
    <p>Contactez-nous pour discuter de votre vision et comment nous pouvons la concrétiser.</p>
    <router-link to="/contact" class="contact-button">Contactez-nous</router-link>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import gsap from 'gsap';
import Navbar from '../components/Navbar.vue';
import { getAllProjects, getProjectsByCategory } from '../data/projects.js';

// Chargement des projets
const projects = ref(getAllProjects());
const activeFilter = ref('all');

// Projets filtrés en fonction du filtre actif
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value;
  } else {
    const categoryMap = {
      'web': 'Développement web',
      'mobile': 'Développement mobile',
      'design': 'Design graphique'
    };
    
    return projects.value.filter(project => project.category === categoryMap[activeFilter.value]);
  }
});

const filterProjects = (filter, event) => {
  activeFilter.value = filter;
  
  // Reset active class on all buttons
  document.querySelectorAll('.filter-button').forEach(button => {
    button.classList.remove('active');
  });
  
  // Add active class to clicked button
  if (event && event.target) {
    event.target.classList.add('active');
  } else {
    // Fallback si event n'est pas disponible
    const buttonToActivate = document.querySelector(`.filter-button[data-filter="${filter}"]`);
    if (buttonToActivate) {
      buttonToActivate.classList.add('active');
    }
  }
};

onMounted(() => {
  // Remonter en haut de la page
  window.scrollTo(0, 0);
  
  // Animation pour la page projets
  gsap.from('.projects-hero-content h1', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.projects-hero-content p', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });
  
  gsap.from('.projects-filter', {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out'
  });
  
  gsap.from('.project-detailed-card', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.7,
    ease: 'back.out(1.7)'
  });
});
</script>

<style scoped>
/* Hero Section pour la page Projets */
.projects-hero-section {
  width: 100%;
  height: 50vh;
  background-color: #1C1C1C;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.projects-hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/fond.png');
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: 1;
}

.projects-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #F2EFEA;
  padding: 2rem;
}

.projects-hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: 64px;
  font-weight: 400;
  margin-bottom: 20px;
}

.projects-hero-content p {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  max-width: 600px;
  margin: 0 auto;
}

/* Section Projets Détaillés */
.projects-detailed-section {
  width: 100%;
  padding: 80px 0;
  background-color: #F9F7F4;
}

.projects-filter {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.filter-button {
  background-color: transparent;
  border: 1px solid #C8A96A;
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button:hover, .filter-button.active {
  background-color: #C8A96A;
  color: #fff;
}

.projects-container {
  display: flex;
  justify-content: center;
  gap: 70px 90px; /* Augmentation de l'espacement horizontal entre les projets */
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.project-card {
  display: flex;
  flex-direction: column;
  width: 293px;
  position: relative;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}



.project-image-container {
  box-sizing: border-box;
  width: 289px;
  height: 372px;
  border: 1px solid #C8A96A;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
}

.project-image {
  box-sizing: border-box;
  width: 287px;
  height: 370px;
  border: 1px solid #C8A96A;
  object-fit: cover;
  position: relative;
}

.project-title {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 5px;
}

.project-category {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
}

/* Sections supprimées car les éléments ne sont plus utilisés */

/* Section Contact simplifiée */
.projects-contact-section {
  background-color: #1C1C1C;
  color: #F2EFEA;
  text-align: center;
  padding: 80px 20px;
}

.projects-contact-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 20px;
}

.projects-contact-section p {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 30px;
}

.contact-button {
  display: inline-block;
  background-color: transparent;
  border: 1px solid #F2EFEA;
  color: #F2EFEA;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  padding: 12px 30px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-button:hover {
  background-color: #F2EFEA;
  color: #1C1C1C;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .projects-container {
    gap: 40px;
  }
}

@media (max-width: 900px) {
  .projects-container {
    gap: 30px;
  }
  
  .project-card {
    width: 250px;
  }
  
  .project-image-container {
    width: 246px;
    height: 320px;
  }
  
  .project-image {
    width: 244px;
    height: 318px;
  }
}

@media (max-width: 768px) {
  .projects-container {
    gap: 20px;
  }
  
  .project-card {
    width: 220px;
  }
  
  .project-image-container {
    width: 216px;
    height: 280px;
  }
  
  .project-image {
    width: 214px;
    height: 278px;
  }
  
  .project-title {
    font-size: 18px;
  }
  
  /* Styles responsives pour le filtre */
  .projects-filter {
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 15px;
  }
  
  .filter-button {
    margin: 5px;
    padding: 8px 15px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .projects-hero-content h1 {
    font-size: 48px;
  }
  
  .projects-hero-content p {
    font-size: 16px;
  }
  
  .projects-filter {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .filter-button {
    margin: 3px;
    padding: 6px 12px;
    font-size: 13px;
    flex: 0 0 auto;
  }
  
  .projects-container {
    padding: 10px;
  }
  
  .project-card {
    width: 100%;
    max-width: 300px;
  }
  
  .project-image-container {
    width: 100%;
    height: auto;
    aspect-ratio: 0.8;
  }
  
  .project-image {
    width: 100%;
    height: 100%;
  }
}
</style>
