// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="w-full p-4 relative">
    <div class="w-[100%%] mt-20">
      <h1 class="text-heading1 text-primary1 ml-4">និសិត</h1>
    </div>
    <div
      class="w-full p-2 mt-2 bg-primary3 rounded-2xl flex items-center justify-between"
    >
      <div>
        <button class="btnActtion">បន្ថែមថ្មី</button>
      </div>
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="ស្វែងរកតាមឈ្មោះ"
          v-model="searchQuery"
        /><button class="btnActtion">ស្វែងរក</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
