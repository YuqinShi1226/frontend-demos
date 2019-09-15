<template>
    <div>
        <span> 这是详情页 {{ id }}</span>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    props: ['id']
}
</script>
