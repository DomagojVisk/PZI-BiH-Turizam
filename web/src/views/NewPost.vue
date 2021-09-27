<template>
    <div class="d-flex justify-content-center align-items-center container">

        <div class="card p-4">
            <h3>Napravi novu objavu</h3>
            <form class="my-2" @submit.prevent="newPost">
                <div class="mb-3 d-flex flex-column align-items-start">
                    <input type="text" placeholder="Naslov" v-model="title" class="form-control" name="title">
                    <div class="form-text">Enter title for post</div>
                </div>
                <div class="mb-4">
                    <textarea class="form-control" v-model="content" placeholder="Tekst" name="content" rows="6"></textarea>
                </div>
                <div class="mb-3 d-flex flex-column align-items-start">
                    <span>Slika</span>
                    <input type="file" name="image" @change="onChange" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data: () => ({
        title: '',
        content: '',
        image: null
    }),
    methods: {
        ...mapActions(["createNewPost"]),
        onChange(e) {
            console.log(e)
            this.image = e.target.files[0]
        },
        newPost() {
            console.log(this.image);
            const formData = new FormData()
            formData.append('title', this.title);
            formData.append('content', this.content);
            formData.append('image', this.image, this.image.name);
            this.createNewPost(formData).then(() => {
                this.$router.replace('/')
            })
        }
    }
}
</script>

<style scoped>
.container {
    height: calc(100vh - 60px);
}
</style>
