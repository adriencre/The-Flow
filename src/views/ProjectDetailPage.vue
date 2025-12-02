<template>
  <section class="project-detail-page">
    <Navbar />
    
    <div class="project-detail-container">
      <div class="project-detail-header">
        <h1 class="project-detail-title">{{ project.title }}</h1>
        <p class="project-detail-category">{{ project.category }}</p>
      </div>
      
      <div class="project-detail-content">
        <div class="project-detail-image-container">
          <img :src="project.image" :alt="project.title" class="project-detail-image">
        </div>
        
        <div class="project-detail-info">
          <div class="project-detail-description">
            <h2>Description du projet</h2>
            <p>{{ project.description }}</p>
          </div>
          
          <div class="project-detail-technologies">
            <h2>Technologies utilisées</h2>
            <div class="tech-tags">
              <span v-for="(tech, index) in project.technologies" :key="index" class="tech-tag">{{ tech }}</span>
            </div>
          </div>
          
          <div class="project-detail-features">
            <h2>Fonctionnalités</h2>
            <ul>
              <li v-for="(feature, index) in project.features" :key="index">{{ feature }}</li>
            </ul>
          </div>
          
          <div class="project-detail-links" v-if="project.links">
            <h2>Liens</h2>
            <div class="link-buttons">
              <a v-if="project.links.live" :href="project.links.live" target="_blank" class="link-button">Voir le site</a>
              <a v-if="project.links.github" :href="project.links.github" target="_blank" class="link-button">GitHub</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="project-detail-gallery" v-if="project.gallery && project.gallery.length > 0">
        <h2>Galerie</h2>
        <div class="gallery-images">
          <div v-for="(image, index) in project.gallery" :key="index" class="gallery-image-container">
            <img :src="image.src" :alt="image.alt" class="gallery-image">
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap';
import Navbar from '../components/Navbar.vue';
import { getProjectBySlug, getPreviousProject, getNextProject } from '../data/projects.js';

const route = useRoute();
const router = useRouter();

// Récupérer le slug du projet depuis l'URL
const projectSlug = route.params.slug;

// Trouver le projet correspondant au slug
const project = computed(() => {
  return getProjectBySlug(projectSlug) || null;
});

// Projets précédent et suivant pour la navigation
const prevProject = computed(() => {
  return project.value ? getPreviousProject(project.value.id) : null;
});

const nextProject = computed(() => {
  return project.value ? getNextProject(project.value.id) : null;
});

// Si le projet n'existe pas, rediriger vers la page des projets
onMounted(() => {
  // Remonter en haut de la page - forcer sur tous les éléments
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  if (!project.value) {
    router.push('/projets');
    return;
  }
  
  // Animations GSAP
  gsap.from('.project-detail-title', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.project-detail-category', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });
  
  gsap.from('.project-detail-image-container', {
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out'
  });
  
  gsap.from('.project-detail-info', {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out'
  });
  
  gsap.from('.gallery-image-container', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 1,
    ease: 'back.out(1.7)'
  });
});
</script>

<style scoped>
.project-detail-page {
  width: 100%;
  min-height: 100vh;
  background-color: #1C1C1C;
  padding-bottom: 80px;
  color: #F2EFEA;
}

/* Styles de navbar supprimés car gérés par le composant Navbar.vue */

.project-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 0;
}

.project-detail-header {
  text-align: center;
  margin-bottom: 60px;
}

.project-detail-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 15px;
  color: #F2EFEA;
}

.project-detail-category {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #C8A96A;
}

.project-detail-content {
  display: flex;
  gap: 60px;
  margin-bottom: 80px;
}

.project-detail-image-container {
  flex: 0 0 55%;
  box-sizing: border-box;
  border: 1px solid #C8A96A;
  overflow: hidden;
  max-height: 800px;
}

.project-detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-detail-info {
  flex: 0 0 40%;
}

.project-detail-info h2 {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 20px;
  margin-top: 40px;
  color: #F2EFEA;
}

.project-detail-info h2:first-child {
  margin-top: 0;
}

.project-detail-description p {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #F2EFEA;
  margin-bottom: 20px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tech-tag {
  background-color: #333333;
  color: #C8A96A;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  padding: 8px 15px;
  border-radius: 3px;
  border: 1px solid #C8A96A;
}

.project-detail-features ul {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #F2EFEA;
  margin-left: 20px;
}

.project-detail-features li {
  margin-bottom: 10px;
}

.link-buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.link-button {
  display: inline-block;
  background-color: transparent;
  border: 1px solid #C8A96A;
  color: #F2EFEA;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  padding: 12px 25px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-button:hover {
  background-color: #C8A96A;
  color: #fff;
}

.project-detail-gallery {
  margin-bottom: 80px;
}

.project-detail-gallery h2 {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
  color: #F2EFEA;
}

.gallery-images {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.gallery-image-container {
  flex: 0 0 calc(33.333% - 20px);
  border: 1px solid #C8A96A;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 250px;
  object-fit: cover;

}



.project-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
}

.nav-button {
  display: inline-block;
  background-color: transparent;
  border: 1px solid #C8A96A;
  color: #F2EFEA;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  padding: 12px 25px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #C8A96A;
  color: #fff;
}

.nav-arrow {
  font-size: 20px;
  vertical-align: middle;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .project-detail-content {
    flex-direction: column;
  }
  
  .project-detail-image-container,
  .project-detail-info {
    flex: 0 0 100%;
  }
  
  .gallery-image-container {
    flex: 0 0 calc(50% - 15px);
  }
}

@media (max-width: 768px) {
  /* Styles responsifs de navbar supprimés car gérés par le composant Navbar.vue */
  
  .project-detail-container {
    padding-top: 20px;
  }
  
  .project-detail-title {
    font-size: 36px;
  }
  
  .gallery-image-container {
    flex: 0 0 100%;
  }
  
  .project-navigation {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
