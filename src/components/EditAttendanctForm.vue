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

      <form @submit="handleSubmit" class="grid grid-cols-2 gap-4">
        <div class="flex flex-col space-y-2">
          <label>នាមត្រកូល</label>
          <input v-model="firstname" type="text" />
          <label for="">នាម</label>
          <input v-model="lastname" type="text" />
          <label for="">អាយុ</label>
          <input v-model="age" type="text" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="">ជំនាន់</label>
          <input v-model="gen" type="text" />
          <label for="">ឆ្នាំ</label>
          <input v-model="year" type="text" />
          <label for="">ជំនាញ</label>
          <input v-model="major" type="text" />
        </div>
        <div class="w-full">
          <button class="btnActtion w-[120px]">កែប្រែ</button>
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
  emit: ["AddSusccesfully", "UpddateSuccess"],

  props: ["datatoedit"],
  setup(props, { emit }) {
    const { addDocs, updateDocs } = useCollection("attendants");
    const age = ref("");
    const firstname = ref("");
    const lastname = ref("");
    const gen = ref("");
    const year = ref("");
    const major = ref("");
    const handleSubmit = async () => {
      const productData = {
        age: age.value,
        firstname: firstname.value,
        lastname: lastname.value,
        gen: gen.value,
        year: year.value,
        major: major.value,
        createdAt: timestamp(),
      };
      if (props.datatoedit) {
        const upadateSuccess = await updateDocs(
          props.datatoedit?.id,
          productData
        );
        if (upadateSuccess) {
          emit("UpddateSuccess");
        }
      } else {
        const success = await addDocs(productData);

        if (success) {
          emit("AddSusccesfully");
        }
      }
      handleClose();
    };
    const handleClose = () => {
      emit("close");
    };
    console.log("====================================");
    console.log(props.datatoedit);
    console.log("====================================");
    onMounted(() => {
      if (props.datatoedit) {
        age.value = props.datatoedit.age;
        firstname.value = props.datatoedit.firstname;
        lastname.value = props.datatoedit.lastname;
        gen.value = props.datatoedit.gen;
        year.value = props.datatoedit.year;
        major.value = props.datatoedit.major;
      }
    });
    return {
      handleSubmit,
      gen,
      age,
      major,
      firstname,
      lastname,
      year,
      handleClose,
    };
  },
};
</script>

<style lang="sass" scoped></style>
