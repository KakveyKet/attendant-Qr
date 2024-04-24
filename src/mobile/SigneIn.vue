<template>
  <div class="w-full bg-primary4 p-2 h-screen">
    <h2 class="text-lg">សូមស្វាគន៏</h2>
    <form
      @submit.prevent="handleSignUp"
      class="w-[90%] space-y-3 mx-auto mt-4 bg-white p-2 rounded-xl"
    >
      <div>
        <label for="email">Username</label>
        <input
          v-model="username"
          type="text"
          class="w-[100%] h-[40px] rounded-lg"
          placeholder="Username"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-[100%] h-[40px] rounded-lg"
          placeholder="Email"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-[100%] h-[40px] rounded-lg"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        class="btnActtion w-full h-[40px] rounded-lg text-body py-1"
      >
        <div>បញ្ចូន</div>
      </button>
    </form>
    <router-link to="/login" class="underline text-center"
      ><p class="mt-4">មានគនណីរួចហើយ</p></router-link
    >
  </div>
</template>

<script>
import { ref } from "vue";
import useSignUp from "@/composible/SigneUp";
import useCollection from "@/composible/useCollection";
import { useRouter } from "vue-router";
import { timestamp } from "@/firebase/firebase";
export default {
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const { setDocs } = useCollection("users");
    const router = useRouter();

    const { signup, error } = useSignUp();
    const handleSignUp = async () => {
      try {
        const res = await signup(email.value, password.value, username.value);
        if (res && res.user && res.user.uid) {
          await setDocs(res.user.uid, {
            username: username.value,
            email: email.value,
            createTedAt: timestamp(),
          });
          router.push({ name: "mobile" });
        }
      } catch (err) {
        error.value = err.message;
      }
    };
    return { username, email, password, handleSignUp };
  },
};
</script>
