<template>
  <div
    class="fixed top-0 z-50 h-[70px] bg-primary4 w-full items-center justify-end gap-4 lg:flex xl:flex md:flex hidden"
  >
    <router-link
      to="/labpermission"
      class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center relative hover:bg-slate-300 duration-300 active:bg-slate-400"
    >
      <div
        class="text-heading4 rounded-full bg-red-500 w-5 h-5 flex items-center justify-center font-semibold absolute text-white -top-2 -right-2"
      >
        <p class="">
          {{ dataitem.length }}
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7 text-black"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
        />
      </svg>
    </router-link>
    <router-link
      to="/studentpermission"
      class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center relative hover:bg-slate-300 duration-300 active:bg-slate-400"
    >
      <div
        class="text-heading4 rounded-full bg-red-500 w-5 h-5 flex items-center justify-center font-semibold absolute text-white -top-2 -right-2"
      >
        <p class="">
          {{ dataitem.length }}
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7 text-black"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
        />
      </svg>
    </router-link>
    <h1 class="text-heading3 font-semibold ml-12 text-primary1">
      Reparing Lab
    </h1>
    <div
      class="w-14 h-14 border rounded-full bg-primary2 mr-5 text-heading3 text-white flex items-center justify-center"
    >
      RP
    </div>
  </div>
</template>

<script>
import { getCollectionQuery } from "@/composible/getCollectection";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const dataitem = ref([]);
    const getData = async () => {
      try {
        await getCollectionQuery(
          "labinbox",
          [],
          (data) => {
            // Filter data with status "Pending"
            dataitem.value = data.filter((item) => item.status === "Pending");
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    const permmision = ref([]);
    const getDataPermission = async () => {
      try {
        await getCollectionQuery(
          "permissions",
          [],
          (data) => {
            // Filter data with status "Pending"
            permmision.value = data.filter((item) => item.status === "Pending");
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    onMounted(() => {
      getData();
      getDataPermission();
    });
    return { dataitem, permmision };
  },
};
</script>
