import type { Project } from '../models/Project';
import { createService } from './factory';
import { companyService } from './company';

export const projectService = {
	...createService<Project>('projects'),
	async getProjectConfigurations(companyId: string) {
		console.log(`Getting configurations for company ${companyId}`);
	},
	createProject(project: Project,companyName:string) {
		 this.createDocument(project).then((docSnap) => {
			 companyService.addProjectToCompany(companyName, docSnap.id);
		 })

	}
};
