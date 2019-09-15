<template>
    <div>
        <nav-head
            v-on:select="$emit('update:curTab', $event)"
            v-on:more="$emit('more')"
            v-bind:tabs="tabs"
        >
        </nav-head>
        <div class="tab-list">
            <template v-for="(tab, name) in tabs">
                <transition v-bind:key="name" name="fade">
                    <div v-show="name === curTab">
                        <slot name="content" v-bind:list="tab.list"></slot>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>

<script>
/**
 * @file Tab container
 * @author Yuqin
 */
import Head from './head.vue';

export default {
    name: 'custom-tab',
    components: {
        'nav-head': Head
    },

    props: ['tabs', 'curTab'],

    methods: {
    }
};
</script>

<style scoped>
nav {
    white-space: nowrap;
    width: 100%;
    overflow-x: scroll;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
