import * as genericService from './generic';

export function createService<T>(collection: string) {
	return {
		getDocument: (docId: string): Promise<T> => {
			return genericService.getDocument<T>(collection, docId);
		},
		getAll(collection: string): Promise<T[]> {
			return genericService.getAllDocuments<T>(collection);
		},
		createDocument: (data: T): Promise<T> => {
			return genericService.createDocument<T>(collection, data);
		},
		saveDocument: (docId: string, data: T): Promise<T> => {
			return genericService.saveDocument<T>(collection, docId, { ...data, createdAt: new Date() });
		},
		updateDocument: (docId: string, data: T): Promise<T> => {
			return genericService.updateDocument<T>(collection, docId, data);
		},
		documentExists: (docId: string): Promise<boolean> => {
			return genericService.documentExists(collection, docId);
		},
		deleteDocument: (docId: string): Promise<void> => {
			return genericService.deleteDocument(collection, docId);
		}
	};
}
