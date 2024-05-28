import type { Layout } from './Layout';
export interface Project {
	name: string;
	createAt: Date;
	steps:number
	layouts: Layout[];
}
