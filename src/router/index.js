import VueRouter from 'vue-router'
import  DashboardView from '../views/DashboardView.vue'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, routes
})


export default router