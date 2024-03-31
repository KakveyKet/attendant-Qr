import { collection, getDocs, getDoc, getFirestore, doc } from '@firebase/firestore';
import { projectFirestore } from '@/firebase/config';
import { ref, watchEffect, onUnmounted } from 'vue';


const getCollectionDoc = async (path) => {
    const db = getFirestore()

    console.log('path', path);
    console.log('====================================');
    let data = await getDoc(doc(db, path))

    console.log('data', data);

    return data.data()
};

export default getCollectionDoc;