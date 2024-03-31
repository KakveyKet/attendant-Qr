<template>
  <div class="w-full h-full felx flex-col items-center justify-center">
    <div
      class="w-[90%] h-[700px] flex flex-col items-center justify-center mx-auto"
    >
      <qrcode-vue
        style="width: 300px; height: 300px"
        class="border-primary1 border-4 p-2"
        :value="qrValueToString(qrValues)"
        :options="qrOptions"
      />
    </div>
    <h2>{{ qrMessage }}</h2>
    <span>{{ qrValues }}</span>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import getUser from "@/composible/getUser";

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      qrOptions: {
        size: 500,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      },
      qrValues: "",
      qrMessage: "",
    };
  },
  created() {
    this.currentQRIndex = parseInt(localStorage.getItem("currentQRIndex")) || 0;
    setInterval(this.changeQRCode, 2000);
    this.updateQRValue(); // Call method to update QR value initially
    this.updateDisplayName(); // Call method to update display name initially
  },
  methods: {
    async updateDisplayName() {
      // Use your Firebase getUser function to fetch the user's data
      const { user } = await getUser();
      console.log("User data:", user); // Log user data for debugging
      // Assuming the display name is in user.displayName
      if (user) {
        this.qrMessage = user.value?.displayName || ""; // Access displayName from user.value
        console.log("Display Name:", this.qrMessage); // Log retrieved display name for debugging
      }
    },
    getCurrentDate() {
      const currentDate = new Date();
      return `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;
    },
    updateQRValue() {
      this.qrValues = this.getCurrentDate();
    },
    changeQRCode() {
      this.updateQRValue();
    },
    reloadPage() {
      window.location.reload();
    },
    qrValueToString(value) {
      return JSON.stringify(value);
    },
    onScanSuccess(decodeResult) {
      const now = new Date();
      const scannedDate = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()}`;

      // Extract the date field from the decoded result
      const { date } = JSON.parse(decodeResult);

      // Check if the scanned date matches today's date
      if (date !== scannedDate) {
        this.qrMessage = "Validation failed";
        console.log("Invalid date");
        return;
      }

      // Proceed with the scanning process
      // Add your code to handle the successful scan here
    },
  },
};
</script>

<style scoped>
.message {
  margin-top: 10px;
}
</style>
