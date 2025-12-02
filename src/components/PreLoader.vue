<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const emit = defineEmits(['loaded']);
const progress = ref(0);
const percentage = ref(0);

onMounted(() => {
  const tl = gsap.timeline();

  // Animation de la barre de progression
  tl.to(progress, {
    value: 100,
    duration: 2.5,
    ease: "power2.inOut",
    onUpdate: () => {
      percentage.value = Math.round(progress.value);
    },
    onComplete: () => {
      // Animation de sortie
      gsap.to('.preloader', {
        y: '-100%',
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          emit('loaded');
        }
      });
    }
  });

  // Animation du texte
  gsap.from('.loader-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
  });
});
</script>

<template>
  <div class="preloader">
    <div class="loader-content">
      <h1 class="loader-text">The Flow</h1>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: percentage + '%' }"></div>
      </div>
      <div class="percentage">{{ percentage }}%</div>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #1C1C1C;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #F2EFEA;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

.loader-text {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  margin-bottom: 30px;
  font-weight: 500;
  letter-spacing: 2px;
}

.progress-container {
  width: 100%;
  height: 2px;
  background-color: rgba(242, 239, 234, 0.1);
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #F2EFEA;
  width: 0;
}

.percentage {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 300;
  align-self: flex-end;
}
</style>

