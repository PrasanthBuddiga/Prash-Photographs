// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			name: 'Playfair Display',
			cssVariable: '--font-playfair',
			provider: fontProviders.google(),
			weights: [400, 500],
			styles: ['normal'],
			fallbacks: ['serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Mrs Saint Delafield',
			cssVariable: '--font-signature-script',
		},
	],
});