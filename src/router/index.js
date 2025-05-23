import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProjectsPage from '../views/ProjectsPage.vue';
import ContactPage from '../views/ContactPage.vue';
import ProjectDetailPage from '../views/ProjectDetailPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/projets',
    name: 'Projects',
    component: ProjectsPage
  },
  {
    path: '/projet/:slug',
    name: 'ProjectDetail',
    component: ProjectDetailPage
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si le hash est présent dans l'URL (par exemple, /#contact), scroller vers cet élément
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    
    // Toujours scroller vers le haut de la page, même si une position sauvegardée existe
    return { top: 0 };
  }
});

export default router;
