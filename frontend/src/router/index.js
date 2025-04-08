import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Admin from '../views/Admin.vue'; 
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import AdoptionForm from '../views/AdoptionForm.vue';
import ArffPredictor from '../components/ArffPredictor.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/adopt/:petId/:petType', name: 'AdoptionForm', component: AdoptionForm, props: true },
  { path: '/predictor', name: 'Predictor', component: ArffPredictor }, // 👈 Cambio aquí
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
