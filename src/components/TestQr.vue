<template>
  <div class="mt-4 ml-4">
    <qrcode-vue :value="qrValue" :options="qrOptions" />
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      qrOptions: {
        size: 200,
        margin: 0,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      },
      qrValues: [
        {
          name: "John Doe",
          studentId: 1,
          gen: 18,
          age: 19,
          level: 20,
        },
      ],
      currentIndex: 0,
      qrValue: "", // Added qrValue data property
    };
  },
  created() {
    this.changeQRCode(); // Call changeQRCode initially
    setInterval(this.changeQRCode, 2000); // Change QR code every 2 seconds
  },
  methods: {
    changeQRCode() {
      // Update currentIndex to move to the next student information
      this.currentIndex = (this.currentIndex + 1) % this.qrValues.length;
      // Update qrValue with the new student information
      this.qrValue = JSON.stringify(this.qrValues[this.currentIndex]);
    },
  },
};
</script>
