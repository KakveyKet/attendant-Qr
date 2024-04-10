<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div
      v-if="showRealQR"
      class="w-[90%] h-[700px] flex flex-col items-center justify-center mx-auto border-primary1 border-2"
    >
      <qrcode-vue
        style="width: 300px; height: 300px"
        :value="qrValueToString(qrValues)"
        :options="qrOptions"
      />

      <!-- <h2>{{ qrMessage }}</h2>
      <span>{{ qrValueToString(qrValues) }}</span>
      <span>{{ userDocument ? userDocument.username : "" }}</span> -->
    </div>

    <div
      v-else
      class="w-[90%] h-[700px] flex flex-col items-center justify-center mx-auto border-primary1 border-2"
    >
      <qrcode-vue
        style="width: 300px; height: 300px"
        :value="qrValueToString(fakeQRValue)"
        :options="qrOptions"
      />
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
import { sha256 } from "js-sha256";
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
    const showRealQR = ref(true); // Control whether to show real or fake QR code
    const fakeQRValue = ref(""); // Placeholder for fake QR code value

    // Fetch user data from Firestore
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
          updateQRValue();
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    const updateQRValue = () => {
      const todayDate = getCurrentDate();
      const username = userDocument.value ? userDocument.value.username : "";
      qrValues.value = {
        username: username,
        date: todayDate,
        code: sha256(username + "nubb" + todayDate).substring(0, 20),
      };
    };
    const updateFakeQRValue = () => {
      const todayDate = getCurrentDate();
      const username = userDocument.value ? userDocument.value.username : "";
      fakeQRValue.value = {
        username: username,
        date: todayDate,
        code: sha256(username + "test" + todayDate).substring(0, 20),
      };
    };
    const switchQRCode = () => {
      setInterval(() => {
        showRealQR.value = !showRealQR.value;
      }, 500);
    };
    onMounted(async () => {
      const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          await fetchUserData(user.uid);
          unsubscribe();
          updateFakeQRValue();
          switchQRCode();
        } else {
          console.error("Current user is null.");
        }
      });
    });

    const qrValues = ref("");
    const qrMessage = ref("");

    const qrValueToString = (value) => {
      return JSON.stringify(value);
    };

    const getCurrentDate = () => {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const year = currentDate.getFullYear().toString();
      return day + month + year;
    };

    return {
      qrOptions,
      qrValues,
      qrMessage,
      qrValueToString,
      userDocument,
      showRealQR,
      fakeQRValue,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
