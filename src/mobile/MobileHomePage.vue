<template>
  <div class="w-full h-screen relative">
    <MenuBarVue />
    <router-view></router-view>
  </div>
</template>

<script>
import MenuBarVue from "./MenuBar.vue";
export default {
  components: {
    MenuBarVue,
  },
};
</script>

<style lang="sass" scoped></style>
