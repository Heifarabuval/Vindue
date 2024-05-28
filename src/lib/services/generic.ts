import { doc,collection as col, getDoc, setDoc, getDocs , query,deleteDoc,addDoc, updateDoc} from 'firebase/firestore';
import { firestore } from '../index';

export async function getDocument<T>(collection: string, docId: string): Promise<T> {
	const docRef = doc(firestore, collection, docId);
	const docSnap = await getDoc(docRef);
	return docSnap.data() as T;
}

export async function createDocument<T>(collection: string, data: T): Promise<T> {
	const docRef = col(firestore, collection);
	const docSnap = await addDoc(docRef, data as Map<string, unknown>);
	return docSnap as unknown as T;
}

export async function saveDocument<T>(collection: string, docId: string, data: T): Promise<T> {
	const docRef = doc(firestore, collection, docId);
	await setDoc(docRef, data as Map<string, unknown>);
	return data;
}

export async function updateDocument<T>(collection: string, docId: string, data: T): Promise<T> {
	const docRef = doc(firestore, collection, docId);
	await updateDoc(docRef, data as any);
	return data;

}

export async function documentExists(collection: string, docId: string): Promise<boolean> {
	const docRef = doc(firestore, collection, docId);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
}

export async function getAllDocuments<T>(collection: string): Promise<T[]> {
	const q = query(col(firestore, collection));
	const querySnapshot = await getDocs(q);
	const documents: T[] = [];
	querySnapshot.forEach((doc) => {
		documents.push(doc.data() as T);
	});
	return documents;
}

export async function deleteDocument(collection: string, docId: string): Promise<void> {
	const docRef = doc(firestore, collection, docId);
	await deleteDoc(docRef);
}
