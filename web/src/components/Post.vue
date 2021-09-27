<template>
    <div class="card my-2" v-if="data.approved">
        <img :src="`http://localhost:8000/storage/${data.image_url}`" />
        <h1 class="mt-2">{{ data.title }}</h1>
        <p class="text-start mx-2 my-2">
            {{ data.content }}
        </p>
    </div>
</template>

<script>
export default {
    props: ['data']

}
</script>

<style scoped>
.card img {
    height: 320px;
    object-fit: cover;
}

</style>
