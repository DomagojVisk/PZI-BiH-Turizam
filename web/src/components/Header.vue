<template>
    <div>
        <nav class="navbar navbar-light bg-light px-4">
            <div>

            <router-link to="/" class="navbar-brand">
                <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
                BiH Turizam
            </router-link>
            <router-link to="/new-post">
                <button class="btn btn-outline-primary my2 my-sm-0 mx-2">Nova objava</button>
            </router-link>
            <router-link to="/admin" v-if="user.user_type === 'admin'">
                <button class="btn btn-outline-primary my2 my-sm-0 mx-2">Admin</button>
            </router-link>
            </div>
            <div>
                <span >Hello, {{ user ? user.name : '' }}</span>
                <button class="btn btn-outline-primary my2 my-sm-0 mx-2" @click="logout">Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    computed: {
        ...mapGetters(["user"])
    },
    mounted() {
        console.log(this.user);
    },
    methods: {
        logout() {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            this.$store.commit('SET_TOKEN', '');
            this.$store.commit('SET_USER', '');
            this.$router.replace('/login');
        }
    }
}
</script>

<style scoped>

</style>
