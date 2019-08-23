<template>
    <div class="item single-pic">
        <h3>
            {{ title }}
        </h3>
        <div class="image-list">
            <img v-bind:src="imagePath" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        imageList: {
            type: Array,
            required: true
        }
    },
    computed: {
        articleDate () {
            return new Date()
        },
        imagePath () {
            return this.imageList[0]
        }
    }
}
</script>