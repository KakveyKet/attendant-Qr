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
    <div class="w-full h-[500px] overflow-auto mt-8 rounded-2xl">
      <table>
        <tr>
          <th>ល.រ</th>
          <th>ថ្ងៃបញ្ចូល</th>
          <th>ឈ្មោះ</th>
          <th>អ៊ីម៉ែល</th>
          <th>Qr</th>
          <th class="text-center">សកម្មភាព</th>
        </tr>
        <tr v-for="(data, index) in currentPageItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            {{
              data && data.createtedAt
                ? new Date(data.createtedAt.seconds * 1000).toLocaleString()
                : "N/A"
            }}
          </td>
          <td>{{ data.username }}</td>
          <td>{{ data.email }}</td>
          <td v-if="data.image">test</td>
          <td v-else>មិនមាន</td>
          <td class="flex items-center justify-center gap-2">
            <button
              @click="handleAddEditData(data)"
              class="w-10 h-10 text-green-600 active:text-green-700 hover:text-green-900 text-headin3 duration-300 font-semibold underline"
            >
              កែប្រែ
            </button>
          </td>
        </tr>
      </table>
      <div class="w-full">
        <div class="w-full flex items-center justify-end mt-8 gap-4">
          <button
            :class="{ 'bg-primery1/50': currentPage === 1 }"
            v-if="currentPage > 1"
            class="w-10 h-10 bg-primery1 rounded-md text-white flex items-center justify-center hover:bg-background hover:border-2 duration-200 hover:text-primery1 hover:border-primery1"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          {{ currentPage }} of {{ totalPages }}
          <button
            :class="{ 'bg-primery1/50': currentPage === totalPages }"
            class="w-10 h-10 bg-primery1 rounded-md text-white flex items-center justify-center hover:bg-background hover:border-2 duration-200 hover:text-primery1 hover:border-primery1"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <component
    :is="currentComponent"
    @close="handleClose"
    :datatoedit="datatoedit"
  />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { getCollectionQuery } from "@/composible/getCollectection";
import AddStudentVue from "./AddStudent.vue";
export default {
  components: {
    AddStudentVue,
  },
  setup() {
    const currentComponent = ref("");

    const datatoedit = ref(null);
    const handleAddEditData = (item) => {
      currentComponent.value = "AddStudentVue";
      datatoedit.value = item;
      console.log("====================================");
      console.log(datatoedit.value);
      console.log("====================================");
    };
    const handleClose = () => {
      currentComponent.value = "";
    };
    const dataitem = ref([]);
    const getData = async () => {
      try {
        await getCollectionQuery(
          "users",
          [],
          (data) => {
            dataitem.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    onMounted(() => {
      getData();
    });
    let sortedbyASC = ref(true);

    const sortList = (sortBy) => {
      if (sortedbyASC.value) {
        dataitem.value.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        sortedbyASC.value = false;
      } else {
        dataitem.value.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        sortedbyASC.value = true;
      }
    };

    const itemsPerPage = 5;
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil(filteredItems.value.length / itemsPerPage);
    });

    const currentPageItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredItems.value.slice(startIndex, endIndex);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };
    const searchQuery = ref("");
    const filteredItems = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return dataitem.value.filter((item) => {
        if ((item && item.username) || item.email) {
          return (
            item.username.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query)
          );
        }
        return false;
      });
    });
    return {
      sortList,
      currentPageItems,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      filteredItems,
      searchQuery,
      handleAddEditData,
      handleClose,
      currentComponent,
      datatoedit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
