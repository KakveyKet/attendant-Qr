<template>
  <div class="w-full bg-primary4 p-2 h-screen">
    <h2 class="text-lg">សូមស្វាគន៏</h2>
    <form
      @submit.prevent="handleSignIn"
      action=""
      class="w-[90%] space-y-3 mx-auto mt-4 bg-white p-2 rounded-xl"
    >
      <div>
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="email"
          class="w-[100%] h-[40px] rounded-lg"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="w-[100%] h-[40px] rounded-lg placeholder:text-sm placeholder:text-medium"
        />
      </div>
      <button class="btnActtion w-full h-[40px] rounded-lg text-body py-1">
        <div>បញ្ចូន</div>
      </button>
    </form>
    <router-link to="/register" class="underline text-center"
      ><p class="mt-4">មិនទាន់មានគនណី</p></router-link
    >
    <router-link to="/forgot" class="underline text-center"
      ><p class="mt-4">ភ្លេចពាកសម្ងាត់</p></router-link
    >
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useSignIn from "@/composible/SigneUp";
export default {
  setup() {
    const router = useRouter();
    const { signin, error, isPending } = useSignIn();
    const email = ref("");
    const password = ref("");
    const handleSignIn = async () => {
      await signin(email.value, password.value);
      if (!error.value && isPending.value === false) {
        router.push({ name: "menuitem" });
      }
    };
    return { password, email, handleSignIn };
  },
};
</script>
