<template>
    <div>
    <!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Tambah Buku</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="save">
            <label for="nama" class="form-label">Nama Buku:</label>
            <input type="text" class="form-control" v-model="data_buku.judul_buku" id="nama" autocomplete="off" placeholder="Masukkan nama..">
            <label for="pengarang" class="form-label">Pengarang:</label>
            <input type="text" v-model="data_buku.pengarang" class="form-control" id="pengarang" placeholder="Masukkan pengarang...">
            <br>
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
                    <h1 class="m-0">Data Buku</h1>
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
                                Tambah Buku
                            </button>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Judul Buku</th>
                                        <th>Pengarang</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="b in buku" :key="b.id_buku">
                                        <td>{{ b.id_buku }}</td>
                                        <td>{{ b.judul_buku }}</td>
                                        <td>{{ b.pengarang }}</td>
                                        <td>
                                            <div class="btn-group">                                                       
                                                <router-link class="btn btn-primary" :to="{path: '/editbuku/' + b.id_buku}" >Edit</router-link>  
                                                <button type="button" @click="hapus(b)" class="btn btn-warning" >Hapus</button>                                                      
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
            buku : {},
            data_buku:{},
            message : {},
        }
    },
    created() {
        this.getdetail()
    },
    methods : {
        getdetail(){
            axios.get('http://localhost:8000/api/getbuku/')
            .then(
                ({data}) => {
                   this.buku = data
                }
            )
        },
        save(){
            this.save_data()
        },
        save_data(){
            axios.post('http://localhost:8000/api/createbuku' , this.data_buku)
            .then(
                (response) => {
                    console.log(response)
                    swal('Sukses tambah buku',{
                        icon: 'success',
                        button: false
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200)
                
                }
            )
        },
        hapus(b){
            swal({
                title: "Serius mau dihapus?",
                        text: "Jika terhapus, file ini tidak akan bisa di kembalikan!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            axios.delete('http://localhost:8000/api/deletebuku/' + b.id_buku)
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
                            }, 1200) 
                        } else {
                            swal("Anda berhasil cancel delete!");
                        }
                    });
                }
            }
        }
        </script>
