import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        agenda: 'agenda.html',
        divisi: 'divisi.html',
        organisasi: 'organisasi.html',
        login: 'login.html',
        dashboard: 'dashboard/index.html',
      },
    },
  },
});
