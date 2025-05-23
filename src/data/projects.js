// Données des projets
export const projects = [
  {
    id: 1,
    slug: 'socialside',
    title: 'SocialSide',
    category: 'Développement web',
    image: '/images/socialside.png',
    description: 'Site vitrine professionnel pour un cabinet de conseil international en stratégie sociale, conçu pour présenter leur mission, leurs projets avec des multinationales comme Unilever ou Coca-Cola, et mettre en avant leurs expertises sociétales.',
    technologies: ['Squarespace'],
    features: [
      'Design épuré et professionnel',
      'Sections dynamiques pour les études de cas',
      'Pages dédiées à l’équipe et aux services',
      'Intégration de témoignages clients',
      'Responsive design'
    ],
    links: {
      live: 'https://www.socialside.co',
      github: null
    },
    gallery: [
      { src: '/images/socialside1.png', alt: 'Page d\'accueil SocialSide' },
      { src: '/images/socialside2.png', alt: 'Études de cas SocialSide' },
      { src: '/images/socialside3.png', alt: 'Page À propos SocialSide' }
    ]
  },
  {
    id: 2,
    slug: 'portfolio',
    title: 'Portfolio Personnel',
    category: 'Développement web',
    image: '/images/theflow.png',
    description: 'Portfolio personnel moderne et élégant développé avec Vue.js, mettant en valeur mes projets et compétences avec une esthétique inspirée de l\'art classique et un design épuré.',
    technologies: ['Vue.js', 'JavaScript', 'GSAP', 'CSS3'],
    features: [
      'Design inspiré de l\'art classique',
      'Animations fluides avec GSAP',
      'Pages de détail de projet dynamiques',
      'Formulaire de contact fonctionnel',
      'Responsive design adapté à tous les appareils'
    ],
    links: {
      live: 'https://mon-portfolio.fr',
      github: 'https://github.com/adriencrepel/portfolio'
    },
    gallery: [
      { src: '/images/theflow.png', alt: 'Page d\'accueil du portfolio' },
      { src: '/images/theflow1.png', alt: 'Page des projets' },
      { src: '/images/theflow2.png', alt: 'Page de contact' }
    ]
  },
  {
    id: 3,
    slug: 'cestimportant',
    title: 'C\'est important',
    category: 'Développement web',
    image: '/images/cestimportant.png',
    description: 'Site vitrine de l’association “C’est important”, devenue 113.ORG, dédiée à l’innovation sociale. Il présente les actions de terrain menées pour lutter contre la précarité, renforcer le vivre-ensemble, et accompagner les initiatives citoyennes.',
    technologies: ['WordPress'],
    features: [
      'Présentation claire des programmes d’action',
      'Section dédiée à l’équipe et aux partenaires',
      'Design responsive adapté à tous les écrans',
      'Pages informatives sur les projets d’impact social',
      'Formulaire de contact et appel à mobilisation'
    ],
    links: {
      live: 'https://cestimportant.com'
    },
    gallery: [
      { src: '/images/cestimportant1.png', alt: 'Page d\'accueil C\'est important' },
      { src: '/images/cestimportant2.png', alt: 'Section “Nos actions”' },
      { src: '/images/cestimportant3.png', alt: 'Page contact C\'est important' }
    ]
  }
];

// Fonction pour obtenir un projet par son slug
export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug);
}

// Fonction pour obtenir le projet précédent
export function getPreviousProject(currentId) {
  const currentIndex = projects.findIndex(project => project.id === currentId);
  return currentIndex > 0 ? projects[currentIndex - 1] : null;
}

// Fonction pour obtenir le projet suivant
export function getNextProject(currentId) {
  const currentIndex = projects.findIndex(project => project.id === currentId);
  return currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
}

// Fonction pour obtenir tous les projets
export function getAllProjects() {
  return projects;
}

// Fonction pour obtenir les projets par catégorie
export function getProjectsByCategory(category) {
  if (category === 'all') {
    return projects;
  }
  
  const categoryMap = {
    'web': 'Développement web',
    'mobile': 'Développement mobile',
    'design': 'Design graphique'
  };
  
  return projects.filter(project => project.category === categoryMap[category]);
}
