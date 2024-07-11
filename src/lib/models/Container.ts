import type { Module } from './Module';

export interface Container {
	id: number;
	modules:Module
	layout: string;
}
