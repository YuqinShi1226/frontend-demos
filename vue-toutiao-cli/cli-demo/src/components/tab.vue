<template>
    <div>
        <div v-for="item in convertedTabs" class="item" v-bind:key="item.key">
            {{ item.title }}
        </div>
    </div>
</template>
<script>
import convert from './utils'
export default {
    props: {
        innerTabs: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        convertedTabs () {
            return convert(this.innerTabs)
        }
    }
}
</script>