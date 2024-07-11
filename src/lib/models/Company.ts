import type { Project } from './Project';
import { firestore } from 'firebase-admin';
import DocumentReference = firestore.DocumentReference;

export interface Company {
	name?: string;
	createAt?: Date;
	projects?: DocumentReference<Project>[] | string[]
}
