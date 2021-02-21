<template>
    <div class="item multiple-pic">
        <h3>
          {{ title }}
        </h3>
        <div class="image-list">
          <img
            v-for="(imgPath, idx) in imageList"
            v-bind:key="idx"
            v-bind:src="imgPath"
          />
        </div>
    </div>
</template>
<script>
export default {
    name: 'mpic',
    props: {
      title: {
        type: String,
        required: true
      },
      imageList: {
        type: Array,
        required: true
      }
    }
}
</script>