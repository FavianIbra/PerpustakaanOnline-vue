<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Siswa</h1>
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
                                    <form action="">
                                        Nama:
                                        <input type="text" v-model="nama_siswa" class="form-control" disabled>
                                        Tanggal Lahir :
                                        <input type="date" v-model="tanggal_lahir" class="form-control" >
                                        Gender :
                                        <select v-model="gender">
                                        <option  value=""></option>
                                        </select>
                                    </form>
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

import NavigationBar from '../template/NavigationBar.vue'
import AppSidebar from '../template/AppSidebar.vue'
export default {
    components: {
        'navbar-component' : NavigationBar,
        'sidebar-component' : AppSidebar
    },
    data(){
        return{
            datasiswa: {},
            nama_siswa: '',
            tanggal_lahir:'',
            gender: '',
        }
    },
    created(){
        this.getsiswa(this.$route.params.id)
        this.siswa()
    },
    methods: {
        getsiswa(id){
            axios.get('http://localhost:8000/api/getsiswa/' + id)
                .then(
                    (response) => {
                        console.log(response.data[0])
                        this.nama_siswa = response.data[0].nama_siswa
                        this.tanggal_lahir = response.data[0].tanggal_lahir
                        this.gender = response.data[0].gender
                    }
                )
        },
        siswa(){
            axios.get('http://localhost:8000/api/getsiswa')
            .then(
                ({data}) => {
                    this.datasiswa = data
                }
            )
        }
    }
  
}
</script>
