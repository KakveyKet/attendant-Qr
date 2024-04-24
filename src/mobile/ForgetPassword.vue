<template>
  <div class="w-full flex flex-col items-center justify-center h-screen">
    <form
      class="w-[90%] h-auto bg-background rounded-md shadow-md p-5"
      @submit.prevent="handleSubmit"
    >
      <div
        class="w-full h-[40%] flex flex-col items-center justify-center border-b-2"
      >
        <!-- <img class="w-36" src="../assets/image/image 5.png" alt="" /> -->
        <h2 class="text-Heading1 text-primery1 font-bold">Reparing Lab</h2>
      </div>
      <div class="w-[90%] mx-auto p-4 space-y-3">
        <div class="input">
          <input
            type="text"
            class="outline-none bg-transparent w-full h-full"
            placeholder="អ៊ីម៉ែល"
            v-model="email"
            autofocus
            required
          />
        </div>
        <button
          class="btnActtion py-2 mx-auto flex"
          type="submit"
          :disabled="isPending"
        >
          ផ្ញើរLinkទៅកាន់ Email
        </button>
      </div>
      <router-link class="text-center w-full" :to="{ name: 'login' }">
        <h2 class="text-lg text-primery1 underline">ត្រលប់ក្រោយ</h2>
      </router-link>
    </form>

    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useResetPassword from "@/composible/ForgetPassword";

export default {
  setup() {
    const router = useRouter();
    const { resetPassword, isPending } = useResetPassword();
    const email = ref("");
    const errorMessage = ref("");

    const handleSubmit = () => {
      errorMessage.value = null;
      resetPassword(email.value)
        .then(() => {
          alert("Reset Password email sent. Please check your inbox.");
        })
        .catch((error) => {
          console.error("Error sending reset password email:", error);
          errorMessage.value = error.message;
        });
    };

    // Define the navigation guard
    router.beforeEach((to, from, next) => {
      if (from.name === "forgetpassword" && to.name === "login") {
        console.log("Navigating from forgetpassword to login");
      }
      next();
    });

    return {
      email,
      handleSubmit,
      errorMessage,
      isPending,
    };
  },
};
</script>
