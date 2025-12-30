import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://Jahaziel-19.github.io', // Placeholder, user should update
  base: '/portafolio', // Assuming repository name is portafolio, user might need to change
  integrations: [tailwind(), react()],
});
