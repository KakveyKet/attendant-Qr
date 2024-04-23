<template>
  <div class="w-full p-2">
    <div class="w-[100%%] mt-20">
      <h1 class="text-heading1 text-primary1 ml-4">Dashboard</h1>
    </div>
    <div class="w-[90%] mx-auto mt-12 grid grid-cols-3 gap-y-12">
      <div class="w-[400px] h-[200px] bg-primary2 rounded-2xl shadow-md">
        <div class="flex w-[90%] h-full items-center justify-between mx-auto">
          <div class="">
            <h1 class="text-heading2 font-semibold text-white">និសិត</h1>
            <h2 class="text-heading1 text-primary4 font-bold">
              <span
                v-if="user.length < 10"
                class="text-heading1 text-primary4 font-bold"
              >
                0
              </span>
              {{ attendants.length }}
            </h2>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-20 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-[400px] h-[200px] bg-primary2 rounded-2xl shadow-md">
        <div class="flex w-[90%] h-full items-center justify-between mx-auto">
          <div class="">
            <h1 class="text-heading2 font-semibold text-white">វត្តមាន(ចូល)</h1>
            <h2 class="text-heading1 text-primary4 font-bold">
              <span
                v-if="attendants.length < 10"
                class="text-heading1 text-primary4 font-bold"
              >
                0
              </span>
              {{ attendants.length }}
            </h2>
          </div>
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-20 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-[400px] h-[200px] bg-primary2 rounded-2xl shadow-md">
        <div class="flex w-[90%] h-full items-center justify-between mx-auto">
          <div class="">
            <h1 class="text-heading2 font-semibold text-white">សុំច្បាប់</h1>
            <h2 class="text-heading1 text-primary4 font-bold">
              <span
                v-if="permissions.length < 10"
                class="text-heading1 text-primary4 font-bold"
              >
                0
              </span>
              {{ permissions.length }}
            </h2>
          </div>
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-20 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-[400px] h-[200px] bg-primary2 rounded-2xl shadow-md">
        <div class="flex w-[90%] h-full items-center justify-between mx-auto">
          <div class="">
            <h1 class="text-heading2 font-semibold text-white">វត្តមាន(ចេញ)</h1>
            <h2 class="text-heading1 text-primary4 font-bold">
              <span
                v-if="attendantout.length < 10"
                class="text-heading1 text-primary4 font-bold"
              >
                0
              </span>
              {{ attendantout.length }}
            </h2>
          </div>
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-20 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCollectionQuery } from "@/composible/getCollectection";
import { ref, onMounted } from "vue";
export default {
  setup() {
    const attendants = ref([]);
    const getDataattendants = async () => {
      try {
        await getCollectionQuery(
          "attendants",
          [],
          (data) => {
            attendants.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    const permissions = ref([]);
    const getPermmissions = async () => {
      try {
        await getCollectionQuery(
          "permissions",
          [],
          (data) => {
            permissions.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    const user = ref([]);
    const getUser = async () => {
      try {
        await getCollectionQuery(
          "users",
          [],
          (data) => {
            user.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    const attendantout = ref([]);
    const getAttattendantout = async () => {
      try {
        await getCollectionQuery(
          "attendantsOut",
          [],
          (data) => {
            attendantout.value = data;
          },
          true
        );
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    onMounted(() => {
      getDataattendants();
      getPermmissions();
      getUser();
      getAttattendantout();
    });
    return { attendants, permissions, user, attendantout };
  },
};
</script>

<style lang="scss" scoped></style>
