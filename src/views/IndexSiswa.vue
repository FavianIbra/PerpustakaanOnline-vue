<template>
    <div>
    <!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Tambah Siswa</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="save">
            <label for="nama" class="form-label">Nama Siswa:</label>
            <input type="text" class="form-control" v-model="model.siswa.nama_siswa" id="nama" autocomplete="off" placeholder="Masukkan nama..">
            <label for="tgl_lahir" class="form-label">Date:</label>
            <input type="date" class="form-control" v-model="model.siswa.tanggal_lahir" id="tgl_lahir" autocomplete="off">
            <label for="gender" class="form-label">Gender: </label> <br>
            <div class="btn-group btn-group-toggle" id="gender" data-toggle="buttons">
                <label class="btn btn-outline-success">
                    <input type="radio" value="L" v-model="model.siswa.gender"> Laki-laki
                </label>
                <label class="btn btn-outline-success">
                    <input type="radio" value="P" v-model="model.siswa.gender"> Perempuan
                </label>
            </div><br>
            <label for="kelas">Kelas:</label>
            <select v-model="model.siswa.id_kelas" id="kelas" class="form-control">
                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
            </select>
            <label for="alamat" class="form-label">Alamat:</label>
            <input type="text" class="form-control" v-model="model.siswa.alamat" id="alamat" autocomplete="off">
            <br>
            <input type="submit" class="btn btn-outline-dark">
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
                    <h1 class="m-0">Data Anggota</h1>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary card-outline">
                        <div class="card-body">
                            <button type="button" class="btn btn-outline-dark mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Tambah Siswa
                            </button>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Nama Lengkap</th>
                                        <th>Kelas</th>
                                        <th>Gender</th>
                                        <th>Tanggal Lahir</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="s in siswa" :key="s.id_siswa">
                                        <td>{{ s.id_siswa }}</td>
                                        <td>{{ s.nama_siswa }}</td>
                                        <td>{{ s.nama_kelas }}</td>
                                        <td>{{ s.gender }}</td>
                                        <td>{{ s.tanggal_lahir }}</td>
                                        <td>
                                            <div class="btn-group">                                                       
                                                <router-link class="btn btn-outline-dark"  :to="{ name : 'editsiswa' , params : { id : s.id } }">Edit</router-link>  
                                                <button type="button" @click="hapus(s.id_siswa)" class="btn btn-outline-dark" >Hapus</button>                                                      
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

import Vue from 'vue';
import axios from 'axios';
import swal from 'sweetalert';

Vue.use('axios');

import NavigationBar from '../components/template/NavigationBar.vue'
import AppSidebar from '../components/template/AppSidebar.vue'
export default {
    components: {
        'navbar-component' : NavigationBar,
        'sidebar-component' : AppSidebar
    },
    data() {
        return {
            siswa : {},
            kelas: {},
            model:{
                siswa:{
                nama_siswa:"",
                tanggal_lahir: "",
                gender : "",
                id_kelas: "",
                alamat : "",
                }
            },
            message : {},
        }
    },
    created() {
        this.DataSiswa();
        this.getKelas();
    },
    methods : {
        DataSiswa(){
            axios.get('http://127.0.0.1:8000/api/getsiswa')
            .then(
                ({data}) => {
                    this.siswa = data;
                }
            );
        },
        getKelas(){
            axios.get('http://localhost:8000/api/getkelas')
            .then(
                ({data}) => {
                    this.kelas = data
                }
            )
        },
        save(){
            axios.post('http://localhost:8000/api/createsiswa', this.model.siswa)
            .then(
                (data) => {
                    swal({
                        title:"Sukses tambah siswa",
                        icon: "success"
                    })
                    setTimeout(() => {
        window.location.reload()
    },1000)
                    this.message = data
                }
            )
        },
        hapus(id){
                    swal({
                        title: "Serius mau dihapus?",
                        text: "Jika terhapus, file ini tidak akan bisa di kembalikan!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            axios.delete('http://localhost:8000/api/deletesiswa/'+ id)
                            .then(
                                ({data}) => {
                                    this.message = data
                                }
                            )
                            swal("Sukses! Data kamu sudah berhasil di hapus", {
                                icon: "success",
                            });
                            setTimeout(() => {
                                window.location.reload()
                            },1000)
                        } else {
                            swal("Anda berhasil cancel delete!");
                        }
                    });
                }
            }
        }
        </script>
