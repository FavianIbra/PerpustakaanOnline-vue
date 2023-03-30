<template>
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <h2>Perpustakaan Sekolah</h2>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Masukkan Email dan Password</p>

                <form @submit.prevent="login">
                    <div class="input-group mb-3">
                    <input type="email" class="form-control" placeholder="Email" v-model="email">
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" class="form-control" placeholder="Password" v-model="password">
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <input type="submit" class="btn btn-primary btn-block">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            account : {},
            email: '',
            password: ''
        }
    },
    created() {
        if(this.$store.state.token !== '') {
            this.axios.post('http://localhost:8000/api/checkToken', { headers : { 'Authorization' : `Bearer ` + this.$store.state.token} }
)
                      .then(res => {
                          this.$router.push('/');
                          console.log(res)

                      })
                      .catch(err => {
                          this.$store.commit('clearToken');
                          console.log(err)
                      })
        }

    },
    methods : {
        login() {
            var data_login = {
                email : this.email,
                password : this.password
            }
            axios.post('http://localhost:8000/api/login', data_login)
                      .then(response => {
                        this.$store.commit('setToken',response.data.token)
                        location.href = '/'
                      })
                      .catch((err) => {
                        console.log(err)
                        alert("Password salah")
                    });
}

    }
}
</script>
