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
                                    <form @submit.prevent="save">
                                        <input type="hidden" v-model="id_siswa">
                                        Nama:
                                        <input type="text" v-model="nama_siswa" class="form-control" disabled>
                                        Tanggal Lahir :
                                        <input type="date" v-model="tanggal_lahir" class="form-control" >
                                        Gender :
                                        <select v-model="gender" class=form-control disabled>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                        </select>
                                        Kelas :
                                        <select v-model="id_kelas" class="form-control">
                                            <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
                                        </select>
                                        Alamat :
                                        <input type="text" v-model="alamat" class="form-control">
                                        <input type="submit" class="btn btn-outline-dark mt-3">
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
import swal from 'sweetalert';

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
            kelas: {},
            nama_siswa: '',
            tanggal_lahir:'',
            gender: '',
            id_kelas: '',
            alamat:'',
            id_siswa: ''

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
                        this.id_kelas = response.data[0].id_kelas
                        this.alamat = response.data[0].alamat
                        this.id_siswa = response.data[0].id_siswa
                    }
                )
        },
        siswa(){
            axios.get('http://localhost:8000/api/getkelas')
            .then(
                ({data}) => {
                    this.kelas = data
                }
            )
        },
        save(){
            this.save_data()
        },
        save_data: function(){

            let data_siswa = {
                id_siswa : this.id_siswa ,
                id_kelas : this.id_kelas,
                nama_siswa : this.nama_siswa,
                gender : this.gender,
                tanggal_lahir : this.tanggal_lahir,
                alamat : this.alamat
            }

            axios.put('http://localhost:8000/api/updatesiswa/' + this.id_siswa , data_siswa)
            .then(
                (response) => {
                    console.log(response)
                    swal({
                        title:"Sukses edit siswa",
                        icon: "success"
                    })
                    this.$router.push('/siswa')
                }
            )
        }
    }
  
}
</script>
