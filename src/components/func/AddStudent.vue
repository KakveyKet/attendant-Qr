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
          {{ datatoedit ? "កែប្រែវត្តមាន" : "បន្ថែមវត្តមាន" }}
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

      <form @submit.prevent="handleSubmit" class="gap-4">
        <div class="flex flex-col space-y-2">
          <label>ឈ្មោះ</label>
          <input v-model="username" type="text" />
          <label for="">អ៊ីម៉ែល</label>
          <input v-model="email" type="email" />
          <label for="">ពាក្យសម្ងាត់</label>
          <input v-model="password" type="password" />
          <label for="">រូបភាព Qr</label>
          <input @change="handleFileChange" type="file" />
        </div>
        <div class="w-full">
          <button class="btnActtion w-full mt-4">
            {{ datatoedit ? "កែប្រែ" : "បន្ថែម" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useCollection from "@/composible/useCollection";
import useStorage from "@/composible/useStorage";

export default {
  emit: ["AddSuccessfully", "UpdateSuccess", "close"],
  props: ["datatoedit"],
  setup(props, { emit }) {
    const { uploadImage } = useStorage();
    const { addDocs, updateDocs } = useCollection("users");
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const img = ref(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        console.error("No file selected.");
        return;
      }
      const allowedExtensions = ["jpg", "png", "svg", "jpeg"];
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        console.error("Only jpg, png, svg, and jpeg files are allowed.");
        return;
      }
      img.value = file;
    };

    const handleSubmit = async () => {
      try {
        let imageURL = null;

        if (img.value && img.value !== props.datatoedit?.image) {
          if (img.value.size > 1024 * 1024) {
            console.error("Image size exceeds 1MB limit.");
            return;
          }

          const storagePath = `users/${img.value.name}`;
          imageURL = await uploadImage(storagePath, img.value);
        } else {
          // If img.value hasn't changed or is not provided, retain the existing image URL
          imageURL = props.datatoedit?.image;
        }

        const userData = {
          username: username.value,
          email: email.value,
          password: password.value,
          image: imageURL,
        };

        if (props.datatoedit) {
          const updateSuccess = await updateDocs(props.datatoedit.id, userData);
          if (updateSuccess) {
            emit("UpdateSuccess");
          }
        } else {
          const success = await addDocs(userData);
          if (success) {
            emit("AddSuccessfully");
          }
        }
      } catch (error) {
        console.error("Error performing product operation:", error);
      }

      handleClose();
    };

    const handleClose = () => {
      emit("close");
    };

    onMounted(() => {
      if (props.datatoedit) {
        email.value = props.datatoedit.email;
        username.value = props.datatoedit.username;
        password.value = props.datatoedit.password;
        img.value = props.datatoedit.image;
      }
    });

    return {
      email,
      username,
      password,
      handleSubmit,
      handleFileChange,
      handleClose,
    };
  },
};
</script>

<style lang="sass" scoped></style>
