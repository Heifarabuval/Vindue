// place files you want to import through the `$lib` alias in this folder.
import { initializeApp,getApp,getApps } from 'firebase/app';
import { getFirestore,connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth,connectAuthEmulator } from 'firebase/auth';
const firebaseConfig = {
	appId: 'test',
	apiKey: 'test',
	projectId: "demo-powerform",
}


export 	const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");


