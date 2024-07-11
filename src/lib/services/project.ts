import type { Project } from '../models/Project';
import { createService } from './factory';
import { companyService } from './company';
import { doc } from 'firebase/firestore';
import { firestore } from '../utils/db';

export const projectService = {
	...createService<Project>('projects'),
	createProject(project: Project, companyName: string) {
		this.createDocument(project).then(async (docSnap: any) => {
			await companyService.addProjectToCompany(companyName, docSnap.id);
		});
	},
	async addProjectConfiguration(projectId: string, configurationId: string) {
		const docRefConfiguration = doc(firestore, 'configurations', configurationId);
		const projectConfigurations = await this.getDocument(projectId).then((doc) => {
			return doc?.configurations || [] as any;
		});
		await this.updateDocument(projectId, { configurations: [...projectConfigurations, docRefConfiguration] });
	},
	async removeProjectConfiguration(projectId: string, configurationId: string) {
		const docRefConfiguration = doc(firestore, 'configurations', configurationId);
		const projectConfigurations = await this.getDocument(projectId).then((doc) => {
			return doc?.configurations || [] as any;
		});
		await this.updateDocument(projectId, { configurations: projectConfigurations.filter((configuration: any) => configuration.id !== docRefConfiguration.id) });
	},
	async getProjectConfigurations(projectId: string) {
		const doc = await this.getDocument(projectId);
		return doc?.configurations || [] as any;
	}
};
