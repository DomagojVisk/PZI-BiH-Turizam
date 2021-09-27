<template>
    <div class="register-container">
        <div class="logo">
            <img alt="logo" src="../assets/logo.png">

        </div>
        <h1 class="mt-4 mb-4">BiH Turizam</h1>
        <form class="register-form" @submit.prevent="login">
            <div class="mb-3 text-start">
                <label class="form-label">Ime</label>
                <input type="text" v-model="name" class="form-control" name="email" placeholder="Ime" />
            </div>
            <div class="mb-3 text-start">
                <label class="form-label">Email adresa</label>
                <input type="email" v-model="email" class="form-control" name="email" placeholder="Email adresa" />
            </div>
            <div class="mb-3 text-start">
                <label class="forrm-label">Lozinka</label>
                <input type="password" v-model="password" class="form-control" name="password" placeholder="Lozinka" />
            </div>
            <div class="mb-3 text-start">
                <label class="forrm-label">Potvrdi lozinku</label>
                <input type="password" v-model="password_confirmation" class="form-control" name="password" placeholder="Potvrdi lozinku" />
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-block">Registracija</button>
            </div>
            <div class="d-grid mt-2">
                <span class="text-danger">{{ errorMessage }}</span>
            </div>
            <div class="d-grid mt-2">
                <router-link to="/login">
                    <span class="text-primary">Imaš račun? Prijavi se.</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data: () => ({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errorMessage: '',
    }),
    methods: {
        ...mapActions(["registerUser"]),
        login() {
            this.errorMessage = '';
            this.registerUser({name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation}).then(() => {
                this.$router.replace('/');
            }).catch(err => {
                this.errorMessage = err.response.data.data;
            });
        }
    }

}
</script>

<style scoped>
.register-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.register-container .logo img {
    height: 96px;
}

.register-form {
    width: 480px;
}
</style>
