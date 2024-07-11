import type { Configuration } from '../models/Configuration';
import { createService } from './factory';
import { projectService } from './project';

export const configurationService = {
	...createService<Configuration>('configurations'),
	createConfiguration(configuration: Configuration,projectId:string) {
		this.createDocument(configuration).then(async (docSnap:any) => {
			await projectService.addProjectConfiguration(projectId, docSnap.id);
		})
	}
};
