<template>
  <div class="w-full bg-primary4 p-2 h-full">
    <h2 class="text-heading3">កន្លែកដាក់ច្បាប់</h2>
    <form
      @submit.prevent="handleSubmit"
      v-if="userDocument"
      class="w-[90%] space-y-3 mx-auto mt-2 bg-white p-2 rounded-xl"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-xl font-semibold text-primary1">ឈ្មោះ *</label>
          <br />
          <input
            class="w-[100%] h-[60px] rounded-lg"
            type="text"
            required
            autofocus
            placeholder="ឈ្មោះ"
            v-model="name"
          />
          <input
            class="w-[100%] h-[60px] rounded-lg hidden"
            type="text"
            v-model="userDocument.email"
          />
          <input
            class="w-[100%] h-[60px] rounded-lg hidden"
            type="text"
            v-model="userDocument.username"
          />
        </div>
        <div class="space-y-2">
          <label class="text-xl font-semibold text-primary1">ភេទ *</label>
          <br />
          <select class="w-[100%] h-[60px] rounded-lg" v-model="gender">
            <option
              required
              v-for="gen in genderChoice"
              :key="gen"
              :value="gen"
            >
              {{ gen }}
            </option>
          </select>
        </div>
        <div class="space-y-2">
          <label class="text-xl font-semibold text-primary1">ជំនាន់ *</label>
          <br />
          <input
            class="w-[100%] h-[60px] rounded-lg"
            type="text"
            v-model="generation"
          />
        </div>
        <div class="space-y-2">
          <label class="text-xl font-semibold text-primary1">ជំនាញ *</label>
          <br />
          <input
            class="w-[100%] h-[60px] rounded-lg"
            type="text"
            v-model="skill"
            placeholder="ជំនាញ"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-3">
          <label class="text-xl font-semibold text-primary1">ឆ្នាំទី *</label>
          <br />
          <select class="w-[100%] h-[60px] rounded-lg" v-model="year">
            <option
              required
              v-for="yearS in yearChoice"
              :key="yearS"
              :value="yearS"
            >
              {{ yearS }}
            </option>
          </select>
        </div>
        <div class="space-y-3">
          <label class="text-xl font-semibold text-primary1">ជំនាន់ *</label>
          <br />
          <input
            class="w-[100%] h-[60px] rounded-lg"
            required
            type="text"
            placeholder="ជំនាន់"
            v-model="generation"
          />
        </div>
      </div>

      <div class="space-y-3">
        <label class="text-xl font-semibold text-primary1">មូលហេតុ *</label>
        <br />
        <input
          class="w-[100%] h-[60px] rounded-lg"
          required
          type="text"
          placeholder="មូលហេតុ"
          v-model="reason"
        />
      </div>
      <div class="space-y-3">
        <label for="datetime" class="text-xl font-semibold text-primary1"
          >ចាប់ពីថ្ងៃ *</label
        >
        <br />
        <input
          class="w-[100%] h-[60px] rounded-lg cursor-pointer"
          required
          type="datetime-local"
          v-model="dateFrom"
        />
      </div>
      <div class="space-y-3">
        <label for="datetime" class="text-xl font-semibold text-primary1"
          >ដល់ថ្ងៃ *</label
        >
        <br />
        <input
          class="w-[100%] h-[60px] rounded-lg cursor-pointer"
          required
          type="datetime-local"
          v-model="dateTo"
        />
      </div>
      <div class="flex items-center justify-start gap-4">
        <button class="btnActtion">បញ្ចូន</button>
        <button
          @click="handleClear"
          class="btnActtion bg-primary3 text-primary1 hover:text-white hover:bg-primary1"
        >
          សរសេរម្ដងទៀត
        </button>
      </div>
    </form>
  </div>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>

<script>
import { push, Notivue, Notification } from "notivue";
import { ref, onMounted } from "vue";
import { timestamp } from "@/firebase/firebase";
import useCollection from "@/composible/useCollection";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { projectFirestore } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    Notivue,
    Notification,
  },
  setup() {
    const { addDocs } = useCollection("permissions");
    const name = ref("");
    const year = ref("");
    const reason = ref("");
    const dateFrom = ref("");
    const dateTo = ref("");
    const genderChoice = ref(["ប្រុស", "ស្រី"]);
    const gender = ref("");
    const generation = ref("");
    const yearChoice = ref(["1", "2", "3", "4", "5"]);

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

    const handleSubmit = async () => {
      try {
        const productData = {
          name: name.value,
          year: year.value,
          reason: reason.value,
          dateFrom: dateFrom.value,
          dateTo: dateTo.value,
          email: userDocument.value.email,
          username: userDocument.value.username,
          skill: skill.value,
          gender: gender.value,
          generation: generation.value,
          createdAt: timestamp(),
        };
        await addDocs(productData);
        handleClear();
        push.success("ស្នើរបានជោគជ័យ");
      } catch (error) {
        console.error("Error performing product operation:", error);
      }
    };
    const handleClear = () => {
      name.value = "";
      year.value = "";
      reason.value = "";
      dateFrom.value = "";
      dateTo.value = "";
      skill.value = "";
      gender.value = "";
      generation.value = "";
    };
    onMounted(() => {
      fetchUserData();
    });
    const skill = ref("");
    return {
      skill,
      name,
      year,
      reason,
      dateFrom,
      dateTo,
      gender,
      genderChoice,
      handleSubmit,
      userDocument,
      handleClear,
      yearChoice,
      generation,
    };
  },
};
</script>
