<script setup>
// Importer useRouter pour accéder aux événements de navigation
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Fonction pour forcer le défilement vers le haut
const scrollToTop = () => {
  window.scrollTo(0, 0);
};

// Ajouter un écouteur d'événements pour forcer le défilement vers le haut après chaque navigation
onMounted(() => {
  router.afterEach(() => {
    setTimeout(() => {
      scrollToTop();
    }, 0);
  });
});
</script>

<template>
  <router-view />
</template>

<style>
/* Import des polices depuis Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

/* Reset des marges et paddings par défaut */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}

/* Style pour la hero section */
.hero-section {
  width: 100vw; /* Utilise 100vw pour prendre toute la largeur de la fenêtre */
  height: 100vh; /* Prend toute la hauteur de la fenêtre */
  background-image: url('/images/fond.png');
  background-size: cover; /* L'image couvre toute la section */
  background-position: center; /* L'image est centrée */
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Aligner le contenu à gauche */
  text-align: left; /* Aligner le texte à gauche */
  color: white; /* Couleur du texte */
  position: relative; /* Position relative au lieu d'absolute */
  overflow: hidden; /* Éviter tout débordement */
}

/* Style pour l'overlay de la statue */
.statue-overlay {
  position: absolute;
  top: 0;
  right: 0; /* Positionner à droite */
  width: 85%; /* Prendre 85% de la largeur */
  height: 100%;
  background-image: url('/images/statue.png');
  background-size: cover;
  background-position: right center; /* Centrer l'image à droite */
  background-repeat: no-repeat;
  z-index: 1; /* Placer au-dessus du fond mais en dessous du contenu */
  opacity: 0.9; /* Ajuster l'opacité si nécessaire */
  margin-right: -4%;
}

/* Style pour la navbar */
.navbar {
  position: absolute;
  top: 2rem;
  right: 8rem; /* Déplacé plus vers la gauche (valeur plus grande) */
  z-index: 10;
  margin-right: 0; /* Suppression de la marge qui déplaçait encore plus à droite */
}

.navbar ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.navbar ul li a:hover {
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid white;
}

.hero-content {
  padding: 2rem;
  margin-left: 5%; /* Réduit la marge pour déplacer plus à gauche */
  max-width: 45%;
  margin-bottom: 10%;
  position: relative;
  z-index: 2; /* Placer au-dessus de l'overlay de statue */
}

.hero-content h1 {
  font-size: 88px;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  line-height: 1.1;
  margin-left: -3rem; /* Déplace le titre vers la gauche */
}

.hero-content p {
  font-size: 24px;
  font-weight: 200;
  margin-top: 2rem;
  margin-left: -2rem; /* Déplace le paragraphe vers la gauche */
  max-width: 75%;
}

/* Style pour le bouton CTA */
.cta-button {
  box-sizing: border-box;
  position: relative;
  width: 301px;
  height: 56px;
  margin-top: 2.5rem;
  margin-left: -2rem; /* Aligner avec le paragraphe */
  
  background: rgba(217, 217, 217, 0.2);
  border: 1px solid #F2EFEA;
  
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 1; /* Assurer que le bouton est visible par défaut */
}

.cta-button:hover {
  background: rgba(217, 217, 217, 0.3);
}

/* Styles pour la section Nos services */
.services-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #1C1C1C;
  padding-top: 100px;
  overflow: hidden;
}

.services-title {
  position: relative;
  width: 356px;
  height: 15px;
  margin: 0 auto;
  margin-bottom: 80px;
  text-align: center;
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 85px;
  color: #F2EFEA;
}

.services-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 200px;
}

.service-card {
  position: relative;
  width: 416px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.service-icon {
  margin-bottom: 20px;
  object-fit: contain;
}

/* Style spécifique pour l'icône de développement web (image 4) */
.service-card:first-child .service-icon {
  width: 260px;
  height: 260px;
  margin-top: 40px; /* Marge supérieure pour aligner avec l'autre icône */
}

/* Style spécifique pour l'icône de développement mobile (image 5) */
.service-card:last-child .service-icon {
  width: 300px;
  height: 300px;
}

.service-card:first-child {
  margin-left: 208px;
}

.service-card:last-child {
  margin-right: 220px;
}

.service-title {
  position: relative;
  width: 332px;
  height: 43px;
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 43px;
  color: #F2EFEA;
  margin-bottom: 14px;
  text-align: center;
}

.service-description {
  position: relative;
  width: 416px;
  height: 48px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #F2EFEA;
}
/* Styles pour la section Nos Projets */
.projects-section {
  width: 100%;
  min-height: 100vh;
  padding: 80px 0;
  background-color: #F9F7F4; /* Fond beige clair comme sur la maquette */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projects-title {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 85px;
  color: #000000;
  margin-bottom: 10px;
  text-align: center;
}

.projects-subtitle {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
  margin-bottom: 60px;
  text-align: center;
}

.projects-container {
  display: flex;
  justify-content: center;
  gap: 70px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  display: flex;
  flex-direction: column;
  width: 293px;
  position: relative;
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
/* Styles pour la section Contact */
.contact-section {
  position: relative;
  width: 100%;
  height: 882px;
  background: #1C1C1C;
  padding-top: 64px;
}

.contact-title {
  position: absolute;
  width: 431px;
  height: 85px;
  left: 504px;
  top: 64px;
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 85px;
  color: #F2EFEA;
}

.contact-subtitle {
  position: absolute;
  width: 204px;
  height: 30px;
  left: 616px;
  top: 171px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #F2EFEA;
}

.contact-form {
  position: absolute;
  width: 776px;
  left: 334px;
  top: 271px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
}

.form-group {
  position: relative;
}

.form-group label {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  margin-bottom: 30px;
}

.form-group input,
.form-group textarea {
  background: transparent;
  border: none;
  width: 100%;
  color: #FFFFFF;
  font-family: 'Poppins';
  font-size: 16px;
  outline: none;
}

.form-group textarea {
  resize: none;
  height: 80px;
}

.form-line {
  width: 100%;
  height: 1px;
  background: #FFFFFF;
  margin-top: 5px;
}

.form-group:not(.full-width) {
  width: 350px;
}

.full-width {
  width: 100%;
  margin-bottom: 36px;
}

.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 64px;
}

.form-submit button {
  width: 316px;
  height: 52px;
  background: transparent;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.form-submit button:hover {
  background-color: #FFFFFF;
  color: #1C1C1C;
}

.form-submit button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #FF6B6B;
  font-family: 'Poppins';
  font-size: 12px;
  margin-top: 5px;
  position: absolute;
}

.input-error + .form-line {
  background-color: #FF6B6B;
}

.form-success {
  background-color: rgba(39, 174, 96, 0.1);
  border-left: 4px solid #27AE60;
  color: #FFFFFF;
  padding: 15px;
  margin-bottom: 30px;
  font-family: 'Poppins';
  font-size: 14px;
}

.form-error {
  background-color: rgba(235, 87, 87, 0.1);
  border-left: 4px solid #EB5757;
  color: #FFFFFF;
  padding: 15px;
  margin-bottom: 30px;
  font-family: 'Poppins';
  font-size: 14px;
}
</style>
