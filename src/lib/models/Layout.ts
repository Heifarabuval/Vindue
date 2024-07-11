import type { Container } from './Container';

export interface Layout {
	name: string;
	containers: Container[];
	step: number;
}
