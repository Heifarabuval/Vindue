import { collection, doc, getDoc, increment, updateDoc,setDoc } from 'firebase/firestore';
import { firestore } from '../index';


const counterCol = collection(firestore, 'counter');

export default async function incrementCounter(configId: string, key: 'views'): Promise<unknown> {
	const counterRef = doc(counterCol, configId);
	const docSnap = await getDoc(counterRef);
	if (!docSnap.exists()) {
		return await setDoc(counterRef, { [key]: 1 })
	} else {
		return await updateDoc(counterRef, { [key]: increment(1) });
	}
}
