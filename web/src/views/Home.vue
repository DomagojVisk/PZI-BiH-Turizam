<template>
  <div class="home">
      <div v-if="posts.length > 0" class="container">
        <Post v-for="(post, i) in posts" v-bind:key="i" :data="post"></Post>
      </div>
      <div v-else class="d-flex align-items-center justify-content-center">
          <h3>Nema odobrenih objava</h3>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Post from "../components/Post";
import {mapActions, mapGetters} from "vuex";
export default {

  name: 'Home',
    methods: {
      ...mapActions(["getPosts"])
    },
    computed: {
      ...mapGetters(["posts"]),
    },

    mounted() {
      this.getPosts();
    },
  components: {
      Post
  }
}
</script>
