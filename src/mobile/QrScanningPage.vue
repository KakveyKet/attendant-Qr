<template>
  <div class="w-full h-full felx flex-col items-center justify-center">
    <div
      class="w-[90%] h-[700px] flex flex-col items-center justify-center mx-auto"
    >
      <qrcode-vue
        style="width: 300px; height: 300px"
        class="border-primary1 border-4 p-2"
        :value="
          qrValueToString({
            username: userDocument ? userDocument.username : '',
            date: getCurrentDate(),
          })
        "
        :options="qrOptions"
      />

      <h2>{{ qrMessage }}</h2>
      <span>{{ qrValues }}</span>
      <span>{{ userDocument ? userDocument.username : "" }}</span>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { ref, onMounted } from "vue";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { projectFirestore } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    QrcodeVue,
  },
  setup() {
    const qrOptions = {
      size: 500,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    };
    const userDocument = ref(null);
    onMounted(async () => {
      const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          await fetchUserData(user.uid);
          unsubscribe();
        } else {
          console.error("Current user is null.");
        }
      });
    });
    const fetchUserData = async (userId) => {
      try {
        const docRef = doc(projectFirestore, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          userDocument.value = {
            email: userData.email || "",
            username: userData.username || "",
          };
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    onMounted(() => {
      fetchUserData();
    });

    const qrValues = ref("");
    const qrMessage = ref("");

    const getCurrentDate = () => {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear().toString();
      return day + month + year;
    };

    const updateQRValue = () => {
      const todayDate = getCurrentDate();
      const username = userDocument.value ? userDocument.value.username : "";
      qrValues.value = { username: username, date: todayDate };
    };

    const changeQRCode = () => {
      updateQRValue();
    };

    const reloadPage = () => {
      window.location.reload();
    };
    const qrValueToString = (value) => {
      return JSON.stringify(value);
    };

    onMounted(() => {
      updateQRValue();
      setInterval(changeQRCode, 2000);
    });

    return {
      qrOptions,
      qrValues,
      qrMessage,
      reloadPage,
      qrValueToString,
      userDocument,
      getCurrentDate,
    };
  },
};
</script>

<style scoped>
.message {
  margin-top: 10px;
}
</style>
