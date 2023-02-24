<template>
    <div>
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
                                    <router-link class="btn mb-2" style="background-color: #F0EEED;" to="">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">#</th>
                                            <th>Judul</th>
                                            <th>Pengarang</th>
                                            <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="s in buku" :key="s.id_buku">
                                                <td>{{ s.id_buku }}</td>
                                                <td>{{ s.judul_buku }}</td>
                                                <td>{{ s.pengarang }}</td>
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
            buku : {}
        }
    },
    created() {
        this.DataBuku();
    },
    methods : {
        DataBuku(){
            axios.get('http://127.0.0.1:8000/api/getbuku')
            .then(
                ({data}) => {
                    console.log(data);
                    this.buku = data;
                }
            );
        }
    }
}
</script>
