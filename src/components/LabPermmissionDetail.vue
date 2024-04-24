<template>
  <div
    class="w-full h-full bg-black/30 fixed top-0 right-0 z-50 flex items-center justify-center"
  >
    <div
      class="w-full h-full bg-black/50 fixed top-0 right-0 z-50 flex items-center justify-center"
      v-if="isReject == true"
    >
      <div v-motion-pop class="p-5 bg-white rounded-xl space-y-4">
        <h2 class="text-body">បញ្ចាក់ថាបានបដិសេធ</h2>
        <div class="flex items-center justify-start gap-4">
          <button
            @click="handleCloseReject"
            class="bg-red-500 hover:bg-red-600 active:bg-red-700 duration-300 text-white px-4 py-2 rounded-lg"
          >
            បោះបង់
          </button>

          <button
            @click="updateStatus('reject')"
            class="bg-green-500 hover:bg-green-600 active:bg-green-700 duration-300 text-white px-4 py-2 rounded-lg"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isOpen == true"
      class="w-full h-full bg-black/50 fixed top-0 right-0 z-50 flex items-center justify-center"
    >
      <div v-motion-pop class="p-5 bg-white rounded-xl space-y-4">
        <h2 class="text-body">សូមបញ្ចាក់ថាបានអនុញ្ញាត្តិ</h2>
        <div class="flex items-center justify-start gap-4">
          <button
            @click="closeImprove"
            class="bg-red-500 hover:bg-red-600 active:bg-red-700 duration-300 text-white px-4 py-2 rounded-lg"
          >
            បោះបង់
          </button>

          <button
            @click="updateStatus('improve')"
            class="bg-green-500 hover:bg-green-600 active:bg-green-700 duration-300 text-white px-4 py-2 rounded-lg"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>
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
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-body text-gray-700">មូលហេតុ</h2>

          <h2 class="text-heading4 text-black text-center">
            {{ datatodisplay.reason }}
          </h2>
        </div>
      </div>
      <div class="border-b-2 border-gray-400"></div>
      <div class="w-[80%] py-4 mx-auto flex items-center justify-center gap-12">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-body text-gray-700">ស្ថានភាព</h2>

          <h2 v-if="datatodisplay.status == 'improve'">បានអនុញាត្តិ</h2>
          <h2 v-if="datatodisplay.status == 'reject'">បានអនុញាត្តិ</h2>
          <h2 v-if="datatodisplay.status == 'Pending'">កុំពុងរងចាំ</h2>
        </div>
      </div>
      <div class="w-[80%] py-4 mx-auto flex items-center justify-center gap-12">
        <button
          v-if="datatodisplay.status == 'Pending'"
          @click="handleOpenImprove"
          class="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          យល់ព្រម
        </button>
        <button
          v-if="datatodisplay.status == 'Pending'"
          @click="handleRejectOpen"
          class="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          បដិសេធ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { projectFirestore } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
export default {
  props: ["datatodisplay"],
  setup(props, { emit }) {
    const handleClose = () => {
      emit("close");
    };
    const isOpen = ref(false);
    const handleOpenImprove = () => {
      isOpen.value = true;
    };
    const closeImprove = () => {
      isOpen.value = false;
    };
    const isReject = ref(false);
    const handleRejectOpen = () => {
      isReject.value = true;
    };
    const handleCloseReject = () => {
      isReject.value = false;
    };
    const updateStatus = async (status) => {
      const docRef = doc(projectFirestore, "labinbox", props.datatodisplay.id);
      handleClose();
      try {
        await updateDoc(docRef, {
          status: status,
        });
        console.log("Status updated successfully!");
      } catch (error) {
        console.error("Error updating status: ", error);
      }
    };
    return {
      handleClose,
      updateStatus,
      handleOpenImprove,
      closeImprove,
      isOpen,
      handleRejectOpen,
      isReject,
      handleCloseReject,
    };
  },
};
</script>
