<template>
  <section class="contact-page">
    <Navbar />
    
    <h1 class="contact-title">Contact</h1>
    
    <div class="contact-form-container">
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
            rows="5"
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
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar.vue';

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
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  // Animation pour la page contact
  gsap.from('.contact-title', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.contact-form-container', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  });
});
</script>

<style scoped>
.contact-page {
  width: 100%;
  min-height: 100vh;
  background-color: #1C1C1C;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  padding-top: 180px;
}

.contact-title {
  width: 431px;
  height: 85px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 85px;
  color: #F2EFEA;
  margin-top: 20px;
}

.contact-subtitle {
  width: 204px;
  height: 30px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #F2EFEA;
}



.contact-form-container {
  width: 776px;
  margin: 0 auto;
  margin-top: 100px;
}

/* Messages de succès et d'erreur */
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

/* Styles du formulaire */
.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
}

.form-group {
  position: relative;
}

.form-group:not(.full-width) {
  width: 350px;
}

.full-width {
  width: 100%;
  margin-bottom: 36px;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-title {
    width: auto;
    font-size: 48px;
    line-height: 64px;
  }
  
  .contact-form-container {
    width: 90%;
    max-width: 776px;
    padding-top: 50px;
  }
  
  /* Conserver la disposition horizontale des champs nom/prénom */
  .form-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .form-group:not(.full-width) {
    width: calc(50% - 10px);
    min-width: 250px;
    flex: 1;
  }
}
</style>
