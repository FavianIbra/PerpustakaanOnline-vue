<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Data Peminjaman</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="save">
                            <label for="nama_siswa" class="form-label">Nama Siswa:</label>
                            <select v-model="peminjaman.id_siswa" id="siswa" class="form-control">
                                <option v-for="s in siswa" :key="s.id_siswa" :value="s.id_siswa">{{ s.nama_siswa }}</option>
                            </select>


                            <label for="kelas" class="form-label">Kelas: </label>
                            <select v-model="peminjaman.id_kelas" id="kelas" class="form-control">
                                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
                            </select>
                            
                            <label for="judul_buku" class="form-label">Buku</label>
                            <select v-model="peminjaman.id_buku" id="buku" class="form-control">
                                <option v-for="b in buku" :key="b.id_buku" :value="b.id_buku">{{ b.judul_buku }}</option>
                            </select>

                            <input type="submit" class="btn btn-primary mt-3">
                        </form>
                    </div>
                </div>
            </div>
        </div> 
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Peminjaman</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-20">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <button type="button" class="btn btn-outline-primary mb-2" style="color:black"  data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        Tambah
                                    </button>

                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">ID</th>
                                                <th>Nama Siswa</th>
                                                <th>Tanggal Pinjam</th>
                                                <th>Tanggal Kembali</th>
                                                <th>Tenggat</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="n in getpinjam" :key="n.id_peminjaman">
                                                <td>{{ n.id_peminjaman }}</td>
                                                <td>{{ n.nama_siswa }}</td>
                                                <td>{{ n.tgl_pinjam }}</td>
                                                <td>{{ n.tgl_kembali }}</td>
                                                <td>{{ n.tenggat }}</td>
                                                <td>
                                                    <span v-if="n.status == 'Kembali'"
                                                        class="badge bg-success">Kembali</span>
                                                    <span v-else class="badge bg-danger">Belum kembali</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link style="background-color:#31C6D4 " class="btn" :to="{path: '/detailpeminjaman/' + n.id_peminjaman}">Detail</router-link>

                                                        <span v-if="n.status == 'Dipinjam'"><button class="btn" style="background-color:#FFFF00"
                                                                @click="kembali(n)">Kembali</button></span>


                                                        <button type="button" @click="hapus(n)"
                                                            class="btn " style="background-color:#DC143C; color: #F5F5F5;">Hapus</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import navbar from '../components/template/NavigationBar.vue'
import sidebar from '../components/template/AppSidebar.vue'
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'


Vue.use(axios)

export default {
    components: {
        'navbar-component': navbar,
        'sidebar-component': sidebar,
    },
    data() {
        return {
            pinjam: {},
            siswa: {},
            buku: {},
            kelas: {},
            peminjaman: {},
            getpinjam: {},
            getstatus: {},
        }
    },
    created() {
        this.getsiswa()
        this.getbuku()
        this.getpeminjaman()
        this.getkelas()
        this.filter()

    },
    methods: {
        getsiswa() {
            axios.get('http://localhost:8000/api/getsiswa')
                .then(
                    ({ data }) => {
                        this.siswa = data
                    }
                )
        },
        getbuku() {
            axios.get('http://localhost:8000/api/getbuku')
                .then(
                    ({ data }) => {
                        this.buku = data
                    }
                )
        },
        getkelas() {
            axios.get('http://localhost:8000/api/getkelas')
                .then(
                    ({ data }) => {
                        this.kelas = data
                    }
                )
        },
        save() {
            this.save_data()
        },
        save_data() {
            axios.post('http://localhost:8000/api/createpeminjaman', this.peminjaman)
                .then(
                    (response) => {
                        console.log(response)
                        swal('Sukses tambah peminjaman', {
                            icon: 'success',
                            button: false
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200)
                    }

                )
        },
        getpeminjaman() {
            axios.get('http://localhost:8000/api/getpeminjaman')
                .then(
                    ({ data }) => {
                        this.getpinjam = data
                    }
                )
        },
        detail() {
            swal({
                title: ':(',
                text: 'Masih belum tersedia!!',
                icon: 'error',
                button: false,
                timer: 1000
            })
        },
        hapus(n) {
            swal({
                title: "Mang eak dihapus?",
                text: "Data yang sudah terhapus tidak dapat dikembalikan!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axios.delete('http://localhost:8000/api/deletepeminjaman/' + n.id_peminjaman)
                    swal("Poof! data peminjaman sudah ke hapus!", {
                        icon: "success",
                        button: false
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200);
                } else {
                    swal("Data tidak jadi terhapus!", { icon: 'success' });

                }
            });
        },
        kembali(n) {
            swal({
                title: "Ingin mengembalikan buku?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.put('http://localhost:8000/api/kembalipeminjaman/' + n.id_peminjaman)
                        swal("Selamat! Berhasil mengembalikan buku!", {
                            icon: "success",
                            button: false
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200);
                    } else {
                        swal("Proses mengembalikan buku telah di cancel!", {
                            icon: 'success'
                        })

                    }
                });
        },
    }
}

</script>