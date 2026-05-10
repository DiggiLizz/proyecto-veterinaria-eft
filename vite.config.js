import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// usamos una función para detectar si estamos empaquetando o desarrollando
export default defineConfig(({ command }) => ({
  // si es producción (build) usa la carpeta de GitHub, si es local (serve) usa la raíz
  base: command === 'build' ? '/proyecto-veterinaria-eft/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))