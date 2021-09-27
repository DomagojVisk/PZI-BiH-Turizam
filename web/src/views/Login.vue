<template>
    <div class="login-container">
        <div class="logo">
            <img alt="logo" src="../assets/logo.png">

        </div>
        <h1 class="mt-4 mb-4">BiH Turizam</h1>
        <form class="login-form" @submit.prevent="login">
            <div class="mb-3 text-start">
                <label class="form-label">Email adresa</label>
                <input type="email" v-model="email" class="form-control" name="email" placeholder="Email adresa" />
            </div>
            <div class="mb-3 text-start">
                <label class="forrm-label">Lozinka</label>
                <input type="password" v-model="password" class="form-control" name="password" placeholder="Lozinka" />
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-block">Prijava</button>
            </div>
            <div class="d-grid mt-2">
                <span class="text-danger">{{ errorMessage }}</span>
            </div>
            <div class="d-grid mt-2">
                <router-link to="/register">
                    <span class="text-primary">Nemaš račun? Registriraj se.</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data: () => ({
        email: '',
        password: '',
        errorMessage: '',
    }),
    methods: {
        ...mapActions(["loginUser"]),
        login() {
            this.errorMessage = '';
            this.loginUser({email: this.email, password: this.password}).then(response => {
                console.log(response);
                this.$router.replace('/');
            }).catch(err => {
                this.errorMessage = err.response.data.data;
            });
        }
    }

}
</script>

<style scoped>
.login-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.login-container .logo img {
    height: 96px;
}

.login-form {
    width: 480px;
}
</style>
