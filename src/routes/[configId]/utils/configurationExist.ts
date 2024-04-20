import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../lib';

export default async function configurationExist(configId: string): Promise<boolean> {
	const docRef = doc(firestore, "configurations", configId);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
}
