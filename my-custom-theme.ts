
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "4px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "255 255 255",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #ff6d2c
		"--color-primary-50": "255 233 223", // #ffe9df
		"--color-primary-100": "255 226 213", // #ffe2d5
		"--color-primary-200": "255 219 202", // #ffdbca
		"--color-primary-300": "255 197 171", // #ffc5ab
		"--color-primary-400": "255 153 107", // #ff996b
		"--color-primary-500": "255 109 44", // #ff6d2c
		"--color-primary-600": "230 98 40", // #e66228
		"--color-primary-700": "191 82 33", // #bf5221
		"--color-primary-800": "153 65 26", // #99411a
		"--color-primary-900": "125 53 22", // #7d3516
		// secondary | #0075F2
		"--color-secondary-50": "217 234 253", // #d9eafd
		"--color-secondary-100": "204 227 252", // #cce3fc
		"--color-secondary-200": "191 221 252", // #bfddfc
		"--color-secondary-300": "153 200 250", // #99c8fa
		"--color-secondary-400": "77 158 246", // #4d9ef6
		"--color-secondary-500": "0 117 242", // #0075F2
		"--color-secondary-600": "0 105 218", // #0069da
		"--color-secondary-700": "0 88 182", // #0058b6
		"--color-secondary-800": "0 70 145", // #004691
		"--color-secondary-900": "0 57 119", // #003977
		// tertiary | #0E273C
		"--color-tertiary-50": "219 223 226", // #dbdfe2
		"--color-tertiary-100": "207 212 216", // #cfd4d8
		"--color-tertiary-200": "195 201 206", // #c3c9ce
		"--color-tertiary-300": "159 169 177", // #9fa9b1
		"--color-tertiary-400": "86 104 119", // #566877
		"--color-tertiary-500": "14 39 60", // #0E273C
		"--color-tertiary-600": "13 35 54", // #0d2336
		"--color-tertiary-700": "11 29 45", // #0b1d2d
		"--color-tertiary-800": "8 23 36", // #081724
		"--color-tertiary-900": "7 19 29", // #07131d
		// success | #4BB543
		"--color-success-50": "228 244 227", // #e4f4e3
		"--color-success-100": "219 240 217", // #dbf0d9
		"--color-success-200": "210 237 208", // #d2edd0
		"--color-success-300": "183 225 180", // #b7e1b4
		"--color-success-400": "129 203 123", // #81cb7b
		"--color-success-500": "75 181 67", // #4BB543
		"--color-success-600": "68 163 60", // #44a33c
		"--color-success-700": "56 136 50", // #388832
		"--color-success-800": "45 109 40", // #2d6d28
		"--color-success-900": "37 89 33", // #255921
		// warning | #ffcc00
		"--color-warning-50": "255 247 217", // #fff7d9
		"--color-warning-100": "255 245 204", // #fff5cc
		"--color-warning-200": "255 242 191", // #fff2bf
		"--color-warning-300": "255 235 153", // #ffeb99
		"--color-warning-400": "255 219 77", // #ffdb4d
		"--color-warning-500": "255 204 0", // #ffcc00
		"--color-warning-600": "230 184 0", // #e6b800
		"--color-warning-700": "191 153 0", // #bf9900
		"--color-warning-800": "153 122 0", // #997a00
		"--color-warning-900": "125 100 0", // #7d6400
		// error | #cc3300
		"--color-error-50": "247 224 217", // #f7e0d9
		"--color-error-100": "245 214 204", // #f5d6cc
		"--color-error-200": "242 204 191", // #f2ccbf
		"--color-error-300": "235 173 153", // #ebad99
		"--color-error-400": "219 112 77", // #db704d
		"--color-error-500": "204 51 0", // #cc3300
		"--color-error-600": "184 46 0", // #b82e00
		"--color-error-700": "153 38 0", // #992600
		"--color-error-800": "122 31 0", // #7a1f00
		"--color-error-900": "100 25 0", // #641900
		// surface | #FFEAEE
		"--color-surface-50": "255 252 252", // #fffcfc
		"--color-surface-100": "255 251 252", // #fffbfc
		"--color-surface-200": "255 250 251", // #fffafb
		"--color-surface-300": "255 247 248", // #fff7f8
		"--color-surface-400": "255 240 243", // #fff0f3
		"--color-surface-500": "255 234 238", // #FFEAEE
		"--color-surface-600": "230 211 214", // #e6d3d6
		"--color-surface-700": "191 176 179", // #bfb0b3
		"--color-surface-800": "153 140 143", // #998c8f
		"--color-surface-900": "125 115 117", // #7d7375

	}
}
