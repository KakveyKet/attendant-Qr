<template>
  <div class="w-full h-[900px] mt-20 overflow-auto fixed">
    <div class="w-full h-auto">
      <h2 class="text-heading1 text-primary1 font-semibold p-2 ml-4">
        កត់់វត្តមាន
      </h2>
    </div>

    <div class="w-[760px] p-5 ml-12">
      <div class="w-full h-auto py-3 overflow-auto bg-primary3 rounded-2xl">
        <h3 class="text-lg text-indigo-700 font-semibold text-center">
          ថ្ងៃខែ: {{ currentDate }} - Time {{ currentTime }}
        </h3>
        <h1 class="text-heading3 text-center font-semibold">
          សូមប្រើប្រាស់ Qr code ដែលក្រុមការងារបានផ្ដល់ជូនមកស្កេន
        </h1>
      </div>
    </div>
    <div class="w-[750px] h-auto ml-10">
      <div class="rounded-lg ml-10" id="qr-code-full-region"></div>
    </div>
    <div class="w-[760px] ml-12 p-5">
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

export default {
  components: {
    Notivue,
    Notification,
  },
  data() {
    return {
      scannedqrcode: "",
      currentDate: "",
      currentTime: "",
      scannedRecords: [],
      qrCodeScanned: false,
      html5Qrcodes: null,
      config: { fps: 20, qrbox: { width: 250, height: 250 } },
    };
  },
  methods: {
    createscandqrcodes() {
      this.html5Qrcodes = new Html5Qrcode("qr-code-full-region");
      this.html5Qrcodes.start(
        { facingMode: "environment" },
        this.config,
        this.onScanSuccess
      );
    },
    onScanSuccess(decodeResult) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = this.padZero(hours);
      const currentTime = `${formattedHours}:${this.padZero(minutes)} ${ampm}`;
      // Split the decodeResult to extract data
      const parts = decodeResult.split("\n");

      // Check if enough information is provided
      if (parts.length === 7) {
        const firstName = parts[0];
        const lastName = parts[1];
        const age = parts[2];
        const major = parts[3];
        const year = parts[4];
        const gen = parts[5];
        const gender = parts[6]; // New field: Gender

        // Add the scanned record to Firebase database
        const { addDocs } = useCollection("attendants");
        addDocs({
          firstname: firstName,
          lastname: lastName,
          age: age,
          major: major,
          year: year,
          gen: gen,
          gender: gender,
          createtedAt: timestamp(),
        });

        this.scannedRecords.push({
          firstname: firstName,
          lastname: lastName,
          age: age,
          major: major,
          year: year,
          gen: gen,
          gender: gender, // New field: Gender
          time: currentTime,
        });
        push.success("ស្កេនបានជោគជ័យ");
      } else {
        console.error("Invalid QR code data:", decodeResult);
      }
      this.html5Qrcodes.stop();
      setTimeout(() => {
        this.html5Qrcodes.start(
          { facingMode: "environment" },
          this.config,
          this.onScanSuccess
        );
      }, 5000);
    },

    updateDate() {
      const now = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      this.currentDate = now.toLocaleDateString(undefined, options);
    },
    updateTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedHours = this.padZero(hours);
      this.currentTime = `${formattedHours}:${this.padZero(minutes)} ${ampm}`;
    },
    padZero(num) {
      return num < 10 ? "0" + num : num;
    },
    reloadPage() {
      window.location.reload();
    },
  },
  async mounted() {
    this.updateTime();
    this.updateDate();
    this.createscandqrcodes();
  },
};
</script>
