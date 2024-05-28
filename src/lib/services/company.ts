import { createService } from './factory';
import type { Company } from '../models/Company';
import { firestore } from '../index';
import { doc } from 'firebase/firestore';

export const companyService = {
	...createService<Company>('companies'),

	async getCompanyConfigurations(companyId: string) {
		console.log(`Getting configurations for company ${companyId}`);
	},
	async addProjectToCompany(companyId: string, projectId: string) {
		const docRefProject = doc(firestore, 'projects', projectId);
		const companyProjects = await this.getDocument(companyId).then((doc) => {
			return doc?.projects  || [] as any;
		})
		await this.updateDocument(companyId, { projects: [...companyProjects, docRefProject] });
	},
	async removeProjectFromCompany(companyId: string, projectId: string) {
		const docRefProject = doc(firestore, 'projects', projectId);
		const companyProjects = await this.getDocument(companyId).then((doc) => {
			return doc?.projects  || [] as any;
		})
		await this.updateDocument(companyId, { projects: companyProjects.filter((project: any) => project.id !== docRefProject.id) });
	}
};
