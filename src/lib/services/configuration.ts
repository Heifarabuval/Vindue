import type { Configuration } from '../models/Configuration';
import { createService } from './factory';

export const configurationService = {
	...createService<Configuration>('configurations'),
};
