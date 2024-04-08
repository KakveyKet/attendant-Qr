<template>
  <div class="w-full h-[900px] mt-20 overflow-auto fixed">
    <div class="w-full h-auto">
      <h2
        class="text-heading1 text-primary1 font-semibold p-2 lg:ml-10 xl:ml-10 md:ml-0 ml-0"
      >
        កត់់វត្តមាន
      </h2>
    </div>

    <div
      class="lg:w-[760px] xl:w-[760px] md:w-full w-full p-5 lg:ml-10 xl:ml-10 md:ml-0 ml-0"
    >
      <div class="w-full h-auto py-3 overflow-auto bg-primary3 rounded-2xl">
        <h3 class="text-lg text-indigo-700 font-semibold text-center">
          ថ្ងៃខែ: {{ currentDate }} - Time {{ currentTime }}
        </h3>
        <h1 class="text-heading3 text-center font-semibold">
          សូមប្រើប្រាស់ Qr code ដែលក្រុមការងារបានផ្ដល់ជូនមកស្កេន
        </h1>
      </div>
    </div>
    <div class="w-[500px] md:w-full h-auto lg:ml-10 xl:ml-10 md:ml-0 ml-0">
      <div class="rounded-lg ml-10" id="qr-code-full-region"></div>
    </div>
    <div class="xl:w-[750px] lg:w-[750px] md:w-full w-full h-auto ml-10 mt-4">
      <button class="btnActtion" @click="reloadPage">ចុចបើក Camera</button>
    </div>
  </div>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>
<script>
import { push, Notivue, Notification } from "notivue";
import { Html5Qrcode } from "html5-qrcode";
import useCollection from "@/composible/useCollection";
import { timestamp } from "@/firebase/firebase";
import { ref, onMounted } from "vue";
import { sha256 } from "js-sha256"; // Import SHA-256 hashing function

export default {
  components: {
    Notivue,
    Notification,
  },
  setup() {
    const currentDate = ref("");
    const currentTime = ref("");
    const qrCodeScanned = ref(false);
    const html5QrCodeRef = ref(null);

    const config = {
      fps: 20,
      qrbox: { width: 250, height: 250 },
    };

    const updateDate = () => {
      const now = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      currentDate.value = now.toLocaleDateString(undefined, options);
    };

    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedHours = padZero(hours);
      currentTime.value = `${formattedHours}:${padZero(minutes)} ${ampm}`;
    };

    const padZero = (num) => {
      return num < 10 ? "0" + num : num;
    };

    const reloadPage = () => {
      window.location.reload();
    };

    const createscandqrcodes = () => {
      html5QrCodeRef.value = new Html5Qrcode("qr-code-full-region");
      html5QrCodeRef.value.start(
        { facingMode: "environment" },
        config,
        onScanSuccess
      );
    };
    const stopCameraAfterDelay = () => {
      setTimeout(() => {
        if (html5QrCodeRef.value && html5QrCodeRef.value.isScanning) {
          html5QrCodeRef.value.stop();
        }
      }, 1000);
    };

    let invalidScanCount = 0;

    const onScanSuccess = (decodeResult) => {
      try {
        const decodedData = JSON.parse(decodeResult);
        const username = decodedData.username;
        const qrDate = decodedData.date;
        const code = decodedData.code;
        const today = new Date();
        const todayDate =
          today.getDate().toString().padStart(2, "0") +
          (today.getMonth() + 1).toString().padStart(2, "0") +
          today.getFullYear().toString();
        const decryptedCode = sha256(username + "nubb" + todayDate).substring(
          0,
          20
        );
        if (code === decryptedCode) {
          if (qrDate === todayDate) {
            const { addDocs } = useCollection("attendants");
            addDocs({
              name: username,
              time: qrDate,
              code: code,
              createdAt: timestamp(),
            })
              .then(() => {
                push.success("success");
                console.log("Scanned record added successfully:", {
                  username,
                  qrDate,
                  code,
                });
                stopCameraAfterDelay();
              })
              .catch((error) => {
                console.error("Error adding scanned record:", error);
              });
            invalidScanCount = 0;
          } else {
            invalidScanCount++;
            if (invalidScanCount >= 3) {
              push.error("សូមប្រើប្រាស់ Qr ដែលត្រឹមត្រូវ");
              console.error("Invalid QR code for today's date:", decodeResult);
              invalidScanCount = 0;
            }
          }
        } else {
          invalidScanCount++;
          if (invalidScanCount >= 3) {
            push.error("លេខសំងាត់មិនត្រឹមត្រូវ");
            console.error("Incorrect code scanned:", decodeResult);
            invalidScanCount = 0;
          }
        }
      } catch (error) {
        console.error("Error parsing QR code data:", error);
      }
    };

    onMounted(() => {
      updateDate();
      updateTime();
      createscandqrcodes();
    });

    return {
      currentDate,
      currentTime,
      qrCodeScanned,
      reloadPage,
    };
  },
};
</script>

<style scoped>
.message {
  margin-top: 10px;
}
</style>
