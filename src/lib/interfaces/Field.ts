export interface Field {
	name: string;
	placeholder: string;
	type: string;
	required: boolean;
	minLength: number | null;
	maxLength: number | null;
	radioList?: string[];
	defaultRadio?: string;
}