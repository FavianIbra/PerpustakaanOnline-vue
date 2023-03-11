import VueRouter from 'vue-router'
import  DashboardView from '../views/DashboardView.vue'
import IndexSiswa from '../views/IndexSiswa.vue'
import IndexPeminjaman from '../views/IndexPeminjaman.vue'
import editsiswa from '../components/edit-siswa/EditSiswa.vue'
import DetailPeminjaman from '../components/detailpeminjaman/DetailPeminjaman.vue'
import editbuku from '../components/edit-buku/EditBuku.vue'
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
  },
  {
    path: '/editsiswa/:id',
    component: editsiswa
  },
  {
    path: '/editbuku/:id',
    component: editbuku
  },
  {
  path: '/peminjaman',
  component: IndexPeminjaman
  },
  {
    path: '/detailpeminjaman',
    component: DetailPeminjaman
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, routes
})


export default router