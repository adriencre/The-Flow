<template>
  <!-- Hero Section avec fond.png comme background -->
  <section class="hero-section">
    <!-- Effet de lumière -->
    <div class="light-effect light-effect-1"></div>
    <div class="light-effect light-effect-2"></div>
    <div class="light-effect light-effect-3"></div>
    
    <!-- Image de statue en overlay -->
    <div class="statue-overlay"></div>
    
    <Navbar />
    
    <div class="hero-content">
      <h1>Sculptez votre avenir</h1>
      <p>Comme les sculpteurs d'Athènes, nous façonnons le futur numérique</p>
      <button @click="scrollToServices" class="cta-button">Commencez votre chef d'œuvre</button>
    </div>
  </section>
  
  <!-- Section Nos services -->
  <section id="services" class="services-section">
    <h2 class="services-title">Nos services</h2>
    
    <div class="services-container">
      <div class="service-card">
        <img src="/images/image 4.svg" alt="Icône développement web" class="service-icon">
        <h3 class="service-title">Développement web</h3>
        <p class="service-description">Des sites élégants, rapides et sur-mesure, sculptés pour refléter votre identité et atteindre vos objectifs</p>
      </div>
      
      <div class="service-card">
        <img src="/images/image 5.svg" alt="Icône développement mobile" class="service-icon">
        <h3 class="service-title">Développement mobile</h3>
        <p class="service-description">Des applications fluides et intuitives, pensées pour offrir une expérience optimale sur chaque écran</p>
      </div>
    </div>
  </section>
  
  <!-- Section Nos Projets (aperçu) -->
  <section class="projects-section">
    <h2 class="projects-title">Nos Projets</h2>
    <p class="projects-subtitle">Sculpter avec précision</p>
    
    <div class="projects-container">
      <!-- Boucle sur les 3 premiers projets -->
      <router-link 
        v-for="project in featuredProjects" 
        :key="project.id" 
        :to="'/projet/' + project.slug" 
        class="project-card"
      >
        <div class="project-image-container">
          <img :src="project.image" :alt="'Projet ' + project.title" class="project-image">
        </div>
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-category">{{ project.category }}</p>
      </router-link>
    </div>
    
    <div class="view-all-projects">
      <router-link to="/projets" class="view-all-button">Voir tous nos projets</router-link>
    </div>
  </section>
  
  <!-- Section Contact -->
  <section id="contact" class="contact-section">
    <h2 class="contact-title">contactez nous</h2>
    <p class="contact-subtitle">Sculpter votre future</p>
    
    <div class="contact-form">
      <!-- Message de succès -->
      <div v-if="formSubmitted && formSuccess" class="form-success">
        Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
      </div>
      
      <!-- Message d'erreur -->
      <div v-if="formError" class="form-error">
        Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.
      </div>
      
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group">
            <label for="nom">Nom</label>
            <input 
              type="text" 
              id="nom" 
              name="name" 
              v-model="formData.nom"
              :class="{ 'input-error': formErrors.nom }"
            >
            <div class="form-line"></div>
            <div v-if="formErrors.nom" class="error-message">{{ formErrors.nom }}</div>
          </div>
          
          <div class="form-group">
            <label for="prenom">Prenom</label>
            <input 
              type="text" 
              id="prenom" 
              name="firstname"
              v-model="formData.prenom"
              :class="{ 'input-error': formErrors.prenom }"
            >
            <div class="form-line"></div>
            <div v-if="formErrors.prenom" class="error-message">{{ formErrors.prenom }}</div>
          </div>
        </div>
        
        <div class="form-group full-width">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            v-model="formData.email"
            :class="{ 'input-error': formErrors.email }"
          >
          <div class="form-line"></div>
          <div v-if="formErrors.email" class="error-message">{{ formErrors.email }}</div>
        </div>
        
        <div class="form-group full-width">
          <label for="message">Message</label>
          <textarea 
            id="message" 
            name="message"
            v-model="formData.message"
            :class="{ 'input-error': formErrors.message }"
          ></textarea>
          <div class="form-line"></div>
          <div v-if="formErrors.message" class="error-message">{{ formErrors.message }}</div>
        </div>
        
        <div class="form-submit">
          <button type="submit" :disabled="formSubmitting">
            <span v-if="!formSubmitting">Envoyer</span>
            <span v-else>Envoi en cours...</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar.vue';
import { getAllProjects } from '../data/projects.js';

// Fonction pour défiler vers la section des services
const scrollToServices = () => {
  document.getElementById('services').scrollIntoView({ 
    behavior: 'smooth' 
  });
};

// Récupérer les 3 premiers projets pour l'affichage en page d'accueil
const featuredProjects = computed(() => {
  return getAllProjects().slice(0, 3);
});

// Formulaire de contact
const formData = ref({
  nom: '',
  prenom: '',
  email: '',
  message: ''
});

const formErrors = ref({
  nom: '',
  prenom: '',
  email: '',
  message: ''
});

const formSubmitted = ref(false);
const formSubmitting = ref(false);
const formSuccess = ref(false);
const formError = ref(false);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateForm = () => {
  let isValid = true;
  formErrors.value = {
    nom: '',
    prenom: '',
    email: '',
    message: ''
  };
  
  if (!formData.value.nom.trim()) {
    formErrors.value.nom = 'Le nom est requis';
    isValid = false;
  }
  
  if (!formData.value.prenom.trim()) {
    formErrors.value.prenom = 'Le prénom est requis';
    isValid = false;
  }
  
  if (!formData.value.email.trim()) {
    formErrors.value.email = 'L\'email est requis';
    isValid = false;
  } else if (!validateEmail(formData.value.email)) {
    formErrors.value.email = 'Veuillez entrer un email valide';
    isValid = false;
  }
  
  if (!formData.value.message.trim()) {
    formErrors.value.message = 'Le message est requis';
    isValid = false;
  }
  
  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  formSubmitting.value = true;
  formSuccess.value = false;
  formError.value = false;
  
  try {
    // Préparer les paramètres pour EmailJS
    const templateParams = {
      from_name: `${formData.value.prenom} ${formData.value.nom}`,
      reply_to: formData.value.email,
      message: formData.value.message
    };
    
    // Envoi du formulaire via EmailJS
    await emailjs.send(
      'service_hz1orgq', 
      'template_leujihr', 
      templateParams,
      'OyNM7TgJ_J-KEl8wM'
    );
    
    // Réinitialiser le formulaire après succès
    formData.value = {
      nom: '',
      prenom: '',
      email: '',
      message: ''
    };
    
    formSubmitted.value = true;
    formSuccess.value = true;
    
    // Masquer le message de succès après 5 secondes
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);
    formError.value = true;
  } finally {
    formSubmitting.value = false;
  }
};

onMounted(() => {
  // Remonter en haut de la page
  window.scrollTo(0, 0);
  
  // Initialisation des animations GSAP
  
  // Animation des effets de lumière
  const lightTl = gsap.timeline({
    repeat: -1,
    yoyo: true
  });
  
  // Animation de la première lumière
  lightTl.to('.light-effect-1', {
    x: '50px',
    y: '30px',
    opacity: 0.7,
    duration: 8,
    ease: 'sine.inOut'
  }, 0);
  
  // Animation de la deuxième lumière
  lightTl.to('.light-effect-2', {
    x: '-40px',
    y: '-20px',
    opacity: 0.5,
    duration: 10,
    ease: 'sine.inOut'
  }, 0);
  
  // Animation de la troisième lumière
  lightTl.to('.light-effect-3', {
    scale: 1.2,
    opacity: 0.4,
    duration: 12,
    ease: 'sine.inOut'
  }, 0);
  
  // Navbar (vient du haut)
  gsap.set('.navbar', {
    y: -100,
    opacity: 0
  });
  
  // Titre h1 (vient de la gauche)
  gsap.set('.hero-content h1', {
    x: -200, // Position initiale à gauche
    opacity: 0
  });
  
  // Paragraphe (apparait sur place)
  gsap.set('.hero-content p', {
    opacity: 0 // Seulement invisible au départ
  });
  
  // Bouton CTA (vient du bas)
  gsap.set('.cta-button', {
    y: 100, // Position initiale en bas
    opacity: 0
  });
  
  // Statue (vient du bas)
  gsap.set('.statue-overlay', {
    y: 200, // Position initiale en bas
    opacity: 0
  });
  
  // Timeline principale
  const mainTimeline = gsap.timeline({ delay: 0.2 });
  
  // Première animation : la statue vient d'en bas
  mainTimeline.to('.statue-overlay', {
    y: 0,
    opacity: 0.9,
    duration: 1.2,
    ease: 'power2.out'
  });
  
  // Pause de 0.5 secondes
  mainTimeline.add(() => {}, '+=0');
  
  // Deuxième timeline pour les autres éléments (des 4 côtés)
  const elementsTimeline = gsap.timeline();
  
  // Animation de la navbar (vient du haut)
  elementsTimeline.to('.navbar', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  }, 0); // Tous commencent en même temps (position 0)
  
  // Animation du titre h1 (vient de la gauche)
  elementsTimeline.to('.hero-content h1', {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, 0);
  
  // Animation du paragraphe (apparait sur place)
  elementsTimeline.to('.hero-content p', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, 0);
  
  // Animation du bouton CTA (vient du bas)
  elementsTimeline.to('.cta-button', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, 0);
  
  // Ajouter la deuxième timeline à la timeline principale
  mainTimeline.add(elementsTimeline);
});
</script>

<style scoped>
/* Effet de lumière */
.light-effect {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 169, 106, 0.3) 0%, rgba(200, 169, 106, 0) 70%);
  filter: blur(30px);
  opacity: 0.6;
  z-index: 1;
}

.light-effect-1 {
  width: 500px;
  height: 500px;
  top: -150px;
  right: -100px;
}

.light-effect-2 {
  width: 600px;
  height: 600px;
  bottom: -200px;
  left: -150px;
}

.light-effect-3 {
  width: 400px;
  height: 400px;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}

.view-all-projects {
  margin-top: 60px;
  text-align: center;
}

.view-all-button {
  display: inline-block;
  padding: 12px 30px;
  background-color: transparent;
  border: 1px solid #C8A96A;
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all-button:hover {
  background-color: #C8A96A;
  color: #fff;
}

/* Styles pour les cartes de projet cliquables */
.project-card {
  text-decoration: none;
  color: inherit;

}


</style>
