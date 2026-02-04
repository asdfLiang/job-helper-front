import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/job',
      name: 'job',
      component: () => import('../views/JobView.vue'),
      children: [
        {
          path: 'crawler',
          name: 'jobCrawler',
          component: () => import('../views/job/JobCrawler.vue'),
        },
        {
          path: 'list',
          name: 'jobList',
          component: () => import('../views/job/JobList.vue'),
        },
        {
          path: 'detail/:id',
          name: 'jobDetail',
          component: () => import('../views/job/JobDetail.vue'),
        },
        {
          path: 'target',
          name: 'jobTarget',
          component: () => import('../views/OptimizeView.vue'),
        },
        {
          path: 'target/detail',
          name: 'jobTargetDetail',
          component: () => import('../views/optimize/OptimizeDetailView.vue'),
        },
      ],
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('../views/ResumeView.vue'),
    },

    {
      path: '/plan',
      name: 'plan',
      component: () => import('../views/PlanView.vue'),
    },
  ],
})

export default router
