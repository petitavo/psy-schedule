<script>
import HeaderContent from "./public/component/header-content.component.vue";
import HomeContent from "./public/pages/home-content.component.vue";

export default {
  name: "app",
  components: {HomeContent, HeaderContent},
  title: 'PsySchedule',
  created() {
    console.log('App created');
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>

