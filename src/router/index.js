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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth'
          });
        }, 100);
      });
    }
    
    // Toujours scroller vers le haut de la page, même si une position sauvegardée existe
    // Ignorer complètement savedPosition pour forcer le scroll vers le haut
    return new Promise((resolve) => {
      // Forcer immédiatement le scroll vers le haut
      window.scrollTo(0, 0);
      // Retourner la position pour que le router sache qu'on a géré le scroll
      setTimeout(() => {
        resolve({ top: 0, left: 0, behavior: 'instant' });
      }, 0);
    });
  }
});

export default router;
