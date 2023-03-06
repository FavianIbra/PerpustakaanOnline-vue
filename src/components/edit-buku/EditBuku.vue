<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Buku</h1>
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
                                        <input type="hidden" v-model="id_buku">
                                        Judul Buku:
                                        <input type="text" v-model="judul_buku" class="form-control" >
                                        Pengarang :
                                        <input type="text" v-model="pengarang" class="form-control" >
                                        <input type="submit" class="btn btn-outline-primary mt-2">
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
            buku: {},
            id_buku: '',
            judul_buku :'',
            pengarang :'',

        }
    },
    created(){
        this.getbuku(this.$route.params.id)

    },
    methods: {
        getbuku(id){
            axios.get('http://localhost:8000/api/getbuku/' + id)
                .then(
                    (response) => {
                        console.log(response.data[0])
                        this.id_buku = response.data[0].id_buku
                        this.judul_buku = response.data[0].judul_buku
                        this.pengarang = response.data[0].pengarang
                    }
                )
        },

        save(){
            this.save_data()
        },
        save_data: function(){

            let data_buku = {
                id_buku : this.id_buku,
                judul_buku : this.judul_buku,
                pengarang : this.pengarang,
            }

            axios.put('http://localhost:8000/api/updatebuku/' +  this.id_buku, data_buku)
            .then(
                (response) => {
                    console.log(response)
                    swal({
                        title:"Sukses edit siswa",
                        icon: "success"
                    })
                    this.$router.push('/buku')
                }
            )
        }
    }
  
}
</script>
