import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jahaziel.is-a.dev', // Placeholder, user should update
  base: '/', // Assuming repository name is portafolio, user might need to change
  integrations: [tailwind(), react()],
});
