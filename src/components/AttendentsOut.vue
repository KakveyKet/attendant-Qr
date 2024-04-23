<template>
  <div class="w-full p-4 relative">
    <!-- delete popup -->
    <div class="w-[100%%] mt-20">
      <h1 class="text-heading1 text-primary1 ml-4">វត្តមាន</h1>
    </div>
    <div
      class="w-full p-2 mt-2 bg-primary3 rounded-2xl flex items-center justify-between"
    >
      <router-link to="/scan">
        <button class="btnActtion">កត់់វត្តមាន</button>
      </router-link>
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="ស្វែងរកតាមឈ្មោះ"
          v-model="searchQuery"
        /><button class="btnActtion">ស្វែងរក</button>
      </div>
    </div>
    <vs-tabs class="w-full py-4">
      <vs-tab color="#627254" label="ម៉ោងចេញ">
        <div class="con-tab-ejemplo">
          <div class="w-full h-[500px] overflow-auto mt-8 rounded-2xl">
            <table>
              <tr>
                <td>ល.រ</td>
                <td>ឈ្មោះ</td>
                <td>ម៉ោងចូល</td>
                <td class="text-center">សកម្មភាព</td>
              </tr>
              <tr v-for="(data, index) in currentPageItems" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ data.name }}</td>
                <td>
                  {{
                    data && data.createdAt
                      ? new Date(data.createdAt.seconds * 1000).toLocaleString()
                      : "N/A"
                  }}
                </td>
                <td class="flex items-center justify-center gap-2">
                  <!-- <button
                @click="handleAddEditData(data)"
                class="w-10 h-10 text-green-600 active:text-green-700 hover:text-green-900 text-headin3 duration-300 font-semibold underline"
              >
                កែប្រែ
              </button> -->
                  <button
                    @click="handleDelete(data.id)"
                    class="w-10 h-10 text-red-600 active:text-red-700 hover:text-red-900 text-headin3 duration-300 font-semibold underline"
                  >
                    លុប
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
          <div
            v-if="isDeleteOpen == true"
            class="w-full h-[100vh] bg-black/30 fixed z-[50] top-0 right-0 flex flex-col items-center justify-center"
          >
            <div
              v-motion-pop
              class="w-[300px] bg-white rounded-2xl p-4 text-heading4"
            >
              <div>តើអ្នកត្រូវការលុបមែនឬ?</div>
              <div class="w-full flex items-center gap-3 mt-4">
                <button @click="closeDelete" class="confirmBtn gap-2">
                  បោះបង់
                </button>
                <button
                  @click="deleteProduct"
                  class="confirmBtn border-red-600 hover:bg-red-400"
                >
                  លុប
                </button>
              </div>
            </div>
          </div>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <component
    :is="currentComponent"
    @close="handleClose"
    :datatoedit="datatoedit"
    @AddSusccesfully="handleSubmit"
    @UpddateSuccess="handleUpdateSuccess"
  />
</template>

<script>
import { getCollectionQuery } from "@/composible/getCollectection";
import { onMounted, ref, computed } from "vue";
import useCollection from "@/composible/useCollection";
import EditAttendanctFormVue from "@/components/EditAttendanctForm.vue";
import { push, Notivue, Notification } from "notivue";
export default {
  components: {
    Notivue,
    Notification,
    EditAttendanctFormVue,
  },
  setup() {
    const dataitem = ref([]);
    const { removeDoc } = useCollection("attendants");
    const currentComponent = ref("");
    const datatoedit = ref(null);
    const handleAddEditData = (item) => {
      currentComponent.value = "EditAttendanctFormVue";
      datatoedit.value = item;
      console.log("====================================");
      console.log(datatoedit.value);
      console.log("====================================");
    };

    const AddSusccesfully = () => {
      handleSuccess("Added successfully");
    };

    const handleUpdateSuccess = () => {
      handleSuccess("Updated successfully");
    };
    const handleSuccess = (message) => {
      push.success(message);
    };
    const handleClose = () => {
      currentComponent.value = "";
    };
    const getData = async () => {
      try {
        await getCollectionQuery(
          "attendantsOut",
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
    const productId = ref(null);
    const closeDelete = () => {
      isDeleteOpen.value = !isDeleteOpen.value;
    };
    const isDeleteOpen = ref(false);
    const handleDelete = (id) => {
      productId.value = id;
      isDeleteOpen.value = !isDeleteOpen.value;
    };
    const deleteProduct = async () => {
      closeDelete();
      try {
        if (!productId.value) {
          console.error("Product ID is required.");
          return;
        }
        await removeDoc(productId.value);
        push.warning("លុបបានជោគជ័យ");

        console.log(productId.value);
        productId.value = "";
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
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
        if (item && item.name) {
          return item.name.toLowerCase().includes(query);
        }
        return false;
      });
    });
    return {
      dataitem,
      getData,
      deleteProduct,
      handleDelete,
      isDeleteOpen,
      closeDelete,
      handleAddEditData,
      currentComponent,
      handleClose,
      datatoedit,
      AddSusccesfully,
      handleUpdateSuccess,
      sortList,
      currentPageItems,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      filteredItems,
      searchQuery,
    };
  },
};
</script>
