<template>
  <div
    class="fixed bg-primary3 w-full rounded-t-3xl bottom-0 p-2 flex items-center justify-center gap-8 z-[99]"
  >
    <router-link
      class="w-[80px] h-[70px] duration-300 items-center justify-center flex-col flex rounded-md bg-primary4"
      to="/menuitem"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 text-primary1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
        />
      </svg>

      <p class="font-Kantumruy text-primary1 font-semibold text-body">
        ទំព័រដើម
      </p>
    </router-link>
    <router-link
      :class="[
        'w-[80px]',
        'h-[70px]',
        'duration-300',
        'items-center',
        'justify-center',
        'flex-col',
        'flex',
        'rounded-md',
        'bg-primary4',
        { disabled: !user },
      ]"
      :to="user ? '/qrscanning' : ''"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 text-primary1"
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

      <p class="font-Kantumruy text-primary1 font-semibold text-body">ស្កេន</p>
    </router-link>
    <router-link
      :class="[
        'w-[80px]',
        'h-[70px]',
        'duration-300',
        'items-center',
        'justify-center',
        'flex-col',
        'flex',
        'rounded-md',
        'bg-primary4',
        { disabled: !user },
      ]"
      :to="user ? '/permissions' : ''"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 text-primary1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
        />
      </svg>

      <p class="font-Kantumruy text-primary1 font-semibold text-body">
        ដាក់ច្បាប់
      </p>
    </router-link>
  </div>
</template>

<script>
import getUser from "@/composible/getUser";
export default {
  setup() {
    const { user } = getUser();
    return { user };
  },
};
</script>

<style scoped>
.router-link-active {
  background-color: #1c1678;
  color: white;
}
.router-link-active > p {
  background-color: #1c1678;
  color: white;
}

.router-link-active > svg {
  background-color: #1c1678;
  color: white;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
