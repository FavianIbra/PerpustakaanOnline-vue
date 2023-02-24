<template>
    <div>
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
                                    <router-link class="btn mb-2" style="background-color: #F0EEED;" to="">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
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
                                                        <router-link class="btn" style ="background-color: #609EA2 ;" :to="{ name : 'editsiswa' , params : { id : s.id } }">Edit</router-link>  
                                                        <button type="button" @click="hapus(s.id)" class="btn" style="background-color: #C92C6D;">Hapus</button>                                                      
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
            siswa : {}
        }
    },
    created() {
        this.DataSiswa();
    },
    methods : {
        DataSiswa(){
            axios.get('http://127.0.0.1:8000/api/getsiswa')
            .then(
                ({data}) => {
                    console.log(data);
                    this.siswa = data;
                }
            );
        }
    }
}
</script>
