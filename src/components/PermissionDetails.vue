<template>
  <div
    class="w-full h-full bg-black/30 fixed top-0 right-0 z-50 flex items-center justify-center"
  >
    <div v-motion-pop class="w-[50%] bg-primary4 rounded-2xl">
      <div class="py-2 w-full flex items-center justify-end p-3">
        <button @click="handleClose">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div class="w-[80%] py-4 mx-auto flex items-center justify-around gap-12">
        <div>
          <h2 class="text-body text-gray-700">ឈ្មោះ</h2>
          <h2 class="text-heading4 text-black">
            {{ datatodisplay.name }}
          </h2>
        </div>
        <div>
          <h2 class="text-body text-gray-700">ភេទ</h2>
          <h2 class="text-heading4 text-black">
            {{ datatodisplay.gender }}
          </h2>
        </div>
      </div>
      <div class="border-b-2 border-gray-400"></div>
      <div class="w-[80%] py-4 mx-auto flex items-center justify-around gap-12">
        <div>
          <h2 class="text-body text-gray-700">ជំនាញ</h2>
          <h2 class="text-heading4 text-black">
            {{ datatodisplay.skill }}({{ datatodisplay.year }})
          </h2>
        </div>
        <div>
          <h2 class="text-body text-gray-700">ជំនាន់</h2>
          <h2 class="text-heading4 text-black">
            {{ datatodisplay.generation }}
          </h2>
        </div>
      </div>
      <div class="border-b-2 border-gray-400"></div>
      <div class="w-[80%] py-4 mx-auto flex items-center justify-around gap-12">
        <div>
          <h2 class="text-body text-gray-700">ចាប់ពីថ្ងៃ</h2>
          <h2 class="text-heading4 text-black">
            {{ datatodisplay.dateFrom }}
          </h2>
        </div>
        <div>
          <h2 class="text-body text-gray-700">ដល់ថ្ងៃ</h2>
          <h2 class="text-heading4 text-black">
            {{ datatodisplay.dateTo }}
          </h2>
        </div>
      </div>
      <div class="border-b-2 border-gray-400"></div>
      <div class="w-[80%] py-4 mx-auto flex items-center justify-center gap-12">
        <div class="">
          <h2 class="text-body text-gray-700">មូលហេតុ</h2>
          <h2 class="text-heading4 text-black text-center">
            {{ datatodisplay.reason }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["datatodisplay"],
  setup(props, { emit }) {
    const handleClose = () => {
      emit("close");
    };
    return {
      handleClose,
    };
  },
};
</script>
