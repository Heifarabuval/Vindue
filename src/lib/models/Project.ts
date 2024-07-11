import type { Layout } from './Layout';
import type { Configuration } from './Configuration';
import { firestore } from 'firebase-admin';
import DocumentReference = firestore.DocumentReference;
export interface Project {
	name?: string;
	createAt?: Date;
	steps?:number
	layouts?: Layout[];
	configurations?:  DocumentReference<Configuration>[] | string[];
}
