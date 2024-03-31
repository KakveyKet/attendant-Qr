<template>
  <div class="w-full h-auto p-3 relative">
    <div
      v-if="isSigOut == false"
      class="w-full h-screen bg-black/30 fixed top-0 z-[100] right-0 flex items-center justify-center"
    >
      <div
        class="w-[70&] bg-primary4 p-5 rounded-lg shadow-sm flex flex-col space-y-4"
      >
        <h2 class="text-primary1 text-heading4">តើអ្នកចង់ចាកចេគមែនឬ?</h2>
        <div class="flex items-center justify-center gap-2">
          <button
            @click="handleToggleSigout"
            class="px-6 py-2 bg-primary1 rounded-lg text-heading4"
          >
            បោះបង់
          </button>
          <button
            @click="handleSignOut"
            class="px-6 py-2 bg-red-600 text-primary4 rounded-lg text-heading4"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-heading4 text-primary1">
          សូមស្វាគន៏មកកាន់ Repairing Lab
        </h1>
        <h1 class="text-heading4 text-primary1">
          ជម្រាបសួរ 🤝 {{ user?.displayName }}
        </h1>
      </div>
      <div class="flex items-center justify-center gap-2">
        <div
          class="w-10 h-10 bg-primary1 rounded-full flex items-center justify-center cursor-pointer"
        >
          <p class="text-heading4 text-primary4 uppercase">
            {{ user?.displayName[0] }}
          </p>
        </div>
        <!-- signe out -->
        <div
          @click="handleToggleSigout"
          class="w-10 h-10 bg-primary1/50 rounded-full flex items-center justify-center active:bg-primary1/80 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-primary1"
          >
            <path
              fill-rule="evenodd"
              d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <div
      class="w-full border border-primary1 mt-4 flex items-center justify-center"
    ></div>
    <div class="w-full flex flex-col mt-4">
      <div
        class="text-lg bg-primary3 w-full h-[180px] rounded-lg border-2 border-primary1 relative cursor-pointer active:border-blue-500 active:scale-105 duration-300"
      >
        <div
          class="bg-primary2/30 w-full flex flex-col items-center justify-center h-full absolute backdrop-blur-[2px] top-0 right-0 rounded"
        >
          <h1 class="text-heading2 font-semibold text-white">
            សេវាកម្មនៃ Repairing Lab
          </h1>
        </div>
        <img
          class="w-full h-full object-cover rounded-lg"
          src="../assets/image.png"
          alt=""
        />
      </div>
    </div>
    <div class="w-full flex flex-col mt-4">
      <div
        class="text-lg bg-primary3 w-full h-[180px] rounded-lg border-2 border-primary1 relative cursor-pointer active:border-blue-500 active:scale-105 duration-300"
      >
        <div
          class="bg-primary2/30 w-full flex flex-col items-center justify-center h-full absolute backdrop-blur-[2px] top-0 right-0 rounded"
        >
          <h1 class="text-heading2 font-semibold text-white">
            ស្នើសុំប្រើប្រាស់ Lab
          </h1>
        </div>
        <img
          class="w-full h-full object-cover rounded-lg"
          src="../assets/image copy.png"
          alt=""
        />
      </div>
    </div>
    <div class="w-full flex flex-col mt-4">
      <div
        class="text-lg bg-primary3 w-full h-[180px] rounded-lg border-2 border-primary1 relative cursor-pointer active:border-blue-500 active:scale-105 duration-300"
      >
        <div
          class="bg-primary2/30 w-full flex flex-col items-center justify-center h-full absolute backdrop-blur-[2px] top-0 right-0 rounded"
        >
          <h1 class="text-heading2 font-semibold text-white">
            Reparing Lab Shop
          </h1>
        </div>
        <img
          class="w-full h-full object-cover rounded-lg"
          src="../assets/image copy 2.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import getUser from "@/composible/getUser";
import { projectAuth } from "@/firebase/firebase";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const isSigOut = ref(false);
    const { user } = getUser();
    const router = useRouter();
    const handleToggleSigout = () => {
      isSigOut.value = !isSigOut.value;
    };
    const handleSignOut = async () => {
      try {
        await projectAuth.signOut();
        console.log("Sign-out successful");
        router.push({ name: "login" });
      } catch (error) {
        console.error("Error signing out:", error.message);
      }
    };
    return { user, handleSignOut, isSigOut, handleToggleSigout };
  },
};
</script>
