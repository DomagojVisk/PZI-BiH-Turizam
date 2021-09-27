<template>
    <div class="container">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Naslov</th>
                <th scope="col">ID Korisnika</th>
                <th scope="col">Odobren</th>
                <th scope="col">Akcija</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="post in posts" v-bind:key="post.id">
                <th scope="row">{{post.id}}</th>
                <td>{{ post.title }}</td>
                <td>{{ post.user_id }}</td>
                <td>{{ post.approved ? 'DA' : 'NE' }}</td>
                <td>
                    <button class="btn btn-outline-primary mx-2" @click="updateApproval({id: post.id, value: true})" v-if="!post.approved">Odobri</button>
                    <button class="btn btn-outline-danger mx-2" @click="updateApproval({id: post.id, value: false})" v-if="post.approved">Ukini</button>
                </td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Admin.vue",
    computed: {
        ...mapGetters(["posts"])
    },
    methods: {
        ...mapActions(["getPosts", "updateApproval"])
    },
    mounted() {
      if (this.posts.length === 0) {
          this.getPosts()
      }
    }
}
</script>

<style scoped>

</style>
