import VueRouter from 'vue-router'
import  DashboardView from '../views/DashboardView.vue'
import IndexSiswa from '../views/IndexSiswa.vue'
import IndexBuku from '../views/IndexBuku.vue'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/siswa',
    name: 'IndexSiswa',
    component: IndexSiswa
  },
  {
    path: '/buku',
    name: 'IndexBuku',
    component: IndexBuku
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, routes
})


export default router