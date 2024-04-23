<template>
  <div
    class="flex items-center h-screen w-full justify-center fixed top-0 right-0 bg-black/30 z-50"
  >
    <div
      v-motion-pop
      class="w-auto bg-white rounded-2xl p-4 text-heading4 flex flex-col"
    >
      <div class="w-full flex items-center justify-between">
        <h2 class="text-heading4 font-semibold text-primary1 py-3">
          កែប្រែវត្តមាន
        </h2>
        <button @click="handleClose">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 text-primary1 float-right active:text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-4">
        <div class="flex flex-col space-y-2">
          <label>ឈ្មោះ</label>
          <input v-model="name" type="text" />
          <div class="space-y-2">
            <label class="text-xl font-semibold text-primary1">ភេទ *</label>
            <br />
            <select class="w-[100%] h-[60px] rounded-2xl" v-model="gender">
              <option
                required
                v-for="gen in genderChoice"
                :key="gen"
                :value="gen"
              >
                {{ gen }}
              </option>
            </select>
          </div>
          <label for="">ឆ្នាំ</label>
          <input v-model="year" type="text" />
          <div class="space-y-2">
            <label class="text-xl font-semibold text-primary1">ជំនាញ *</label>
            <br />
            <input type="text" v-model="skill" />
          </div>
          <label for="">ជំនាន់</label>
          <input v-model="generation" type="text" />
        </div>
        <div class="flex flex-col space-y-2">
          <!-- <label for="">ជំនាន់</label>
          <input v-model="dateFrom" type="text" /> -->
          <label for="">ចាប់ពីថ្ងៃ</label>
          <input v-model="dateFrom" type="datetime-local" />
          <label for="">ដល់ថ្ងៃ</label>
          <input v-model="dateTo" type="datetime-local" />
          <label for="">មូលហេតុ</label>
          <input v-model="reason" type="text" />
        </div>
        <div class="w-full">
          <button class="btnActtion w-[120px]">
            {{ datatoedit ? "កែប្រែ" : "បន្ថែម" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import useCollection from "@/composible/useCollection";
import { ref, onMounted } from "vue";
import { timestamp } from "@/firebase/firebase";
export default {
  emit: ["AddSuccessfully", "UpdateSuccess"],
  props: ["datatoedit"],
  setup(props, { emit }) {
    const { addDocs, updateDocs } = useCollection("permissions");
    const name = ref("");
    const year = ref("");
    const reason = ref("");
    const dateFrom = ref("");
    const dateTo = ref("");
    const skill = ref("");
    const genderChoice = ref(["ប្រុស", "ស្រី"]);
    const gender = ref("");
    const generation = ref("");
    const yearChoice = ref(["1", "2", "3", "4", "5"]);
    const handleSubmit = async () => {
      const productData = {
        name: name.value,
        year: year.value,
        reason: reason.value,
        dateFrom: dateFrom.value,
        dateTo: dateTo.value,
        skill: skill.value,
        gender: gender.value,
        createdAt: timestamp(),
      };

      if (props.datatoedit) {
        const updateSuccess = await updateDocs(
          props.datatoedit.id,
          productData
        );
        if (updateSuccess) {
          emit("UpdateSuccess");
        }
      } else {
        const success = await addDocs(productData);
        if (success) {
          emit("AddSuccessfully");
        }
      }

      handleClose();
    };

    const handleClose = () => {
      emit("close");
    };

    onMounted(() => {
      if (props.datatoedit) {
        name.value = props.datatoedit.name || "";
        gender.value = props.datatoedit.gender || "";
        skill.value = props.datatoedit.skill || "";
        dateFrom.value = props.datatoedit.dateFrom || "";
        dateTo.value = props.datatoedit.dateTo || "";
        year.value = props.datatoedit.year || "";
        reason.value = props.datatoedit.reason || "";
        generation.value = props.datatoedit.generation || "";
      }
    });

    return {
      handleSubmit,
      skill,
      name,
      year,
      reason,
      dateFrom,
      dateTo,
      gender,
      generation,
      yearChoice,
      genderChoice,
      handleClose,
    };
  },
};
</script>

<style lang="sass" scoped></style>
