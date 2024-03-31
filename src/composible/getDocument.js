import { collection, getDocs } from '@firebase/firestore';
import { projectFirestore } from '@/firebase/firebase';
import { ref, watchEffect, onUnmounted } from 'vue';

const getDocument = (collectionName, id, subcollection) => {
    const error = ref(null);
    const documents = ref([]);
    if (id) {
        const subcollectionRef = collection(projectFirestore, collectionName, id, subcollection);

        const fetchData = async () => {
            try {
                const snapshot = await getDocs(subcollectionRef);
                const result = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                documents.value = result;
                error.value = null;
            } catch (err) {
                error.value = err.message;
                documents.value = [];
            }
        };

        const unsubscribe = watchEffect((onInvalidate) => {
            fetchData();

            onInvalidate(() => {
                // Cleanup logic here
            });
        });

        onUnmounted(() => {
            unsubscribe();
        });
    }
    return {
        error,
        documents,
    };
};

export default getDocument;