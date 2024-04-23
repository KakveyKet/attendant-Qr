<template>
  <div class="w-full h-[900px] mt-20 overflow-hidden fixed">
    <div class="w-full h-auto">
      <h2
        class="text-heading1 text-primary1 font-semibold p-2 lg:ml-10 xl:ml-10 md:ml-0 ml-0"
      >
        កត់់វត្តមាន(ចេញ)
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
    <div class="w-[750px] h-auto ml-10 mt-4">
      <div class="rounded-lg ml-10" id="qr-code-full-region"></div>
    </div>
    <div class="w-[750px] md:w-full h-auto ml-10 mt-4">
      <button class="btnActtion" @click="toggleCamera">
        {{ cameraButtonText }}
      </button>
    </div>
  </div>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>

<script>
import { push, Notivue, Notification } from "notivue";
import { Html5Qrcode } from "html5-qrcode";
import { ref, onMounted, computed } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { projectFirestore } from "@/firebase/firebase";
import { sha256 } from "js-sha256";
import { timestamp } from "@/firebase/firebase";
export default {
  components: {
    Notivue,
    Notification,
  },
  setup() {
    const currentDate = ref("");
    const currentTime = ref("");
    const html5QrCodeRef = ref(null);
    const isCameraOpen = ref(false);

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

    const toggleCamera = () => {
      isCameraOpen.value = !isCameraOpen.value;
      if (isCameraOpen.value) {
        if (html5QrCodeRef.value) {
          // Check if html5QrCodeRef is not null
          html5QrCodeRef.value.start(
            { facingMode: "environment" },
            config,
            onScanSuccess
          );
        }
      } else {
        if (html5QrCodeRef.value) {
          // Check if html5QrCodeRef is not null
          html5QrCodeRef.value.stop();
          setTimeout(() => {
            isCameraOpen.value = true;
            if (html5QrCodeRef.value) {
              // Check if html5QrCodeRef is not null
              html5QrCodeRef.value.start(
                { facingMode: "environment" },
                config,
                onScanSuccess
              );
            }
          }, 5000); // 5 seconds delay
        }
      }
    };

    const createScanQRCode = () => {
      html5QrCodeRef.value = new Html5Qrcode("qr-code-full-region");
    };

    let scannedData = {};

    const onScanSuccess = async (decodeResult) => {
      console.log("Scan success:", decodeResult);
      try {
        const decodedData = JSON.parse(decodeResult);
        const username = decodedData.username;
        const qrDate = decodedData.date;
        const code = decodedData.code;

        const scannedKey = `${username}_${qrDate}`;

        if (!scannedData[scannedKey]) {
          const today = new Date();
          const todayDate =
            today.getDate().toString().padStart(2, "0") +
            (today.getMonth() + 1).toString().padStart(2, "0") +
            today.getFullYear().toString();

          if (qrDate === todayDate) {
            const decryptedCode = sha256(username + "nubb" + qrDate).substring(
              0,
              20
            );

            console.log("Decrypted code:", decryptedCode);
            console.log("Received code:", code);

            if (code === decryptedCode) {
              await addDoc(collection(projectFirestore, "attendantsOut"), {
                name: username,
                time: qrDate,
                code: code,
                createdAt: timestamp(),
              });
              console.log("Data added to database:", {
                username,
                qrDate,
                code,
              });
              push.success("Success");
              scannedData[scannedKey] = true;
            } else {
              // Invalid QR code
              console.error("Invalid QR code:", decodeResult);
              push.error("Invalid QR code");
            }
          } else {
            // QR code date does not match today's date
            console.error(
              "QR code date does not match today's date:",
              decodeResult
            );
            push.error("QR code date does not match today's date");
          }
        } else {
          console.log("Data already processed.");
        }
      } catch (error) {
        console.error("Error parsing QR code data:", error);
      }
    };

    onMounted(() => {
      updateDate();
      updateTime();
      createScanQRCode();
    });

    return {
      currentDate,
      currentTime,
      toggleCamera,
      cameraButtonText: computed(() =>
        isCameraOpen.value ? "បិទកាមេរ៉ា" : "បើកកាមេរ៉ា"
      ),
    };
  },
};
</script>
