import type { Layout } from './Layout';
import type { Container } from './Container';

interface MainSettings {
	backgroundColor: string;
	width: number;
	height: number;
	alignment: string;
	transition: string;
	from: string;
	duration: number;
}
export interface Configuration{
	name: string
	steps:Layout[]
	mainSettings:MainSettings
}

export interface ConfigurationDao {
	name: string;
	steps: { [key: number]: Container[] };
	mainSettings:MainSettings
}

export interface ConfigurationDto {
	name: string;
	steps: { [key: number]: Container };
	mainSettings:MainSettings
}