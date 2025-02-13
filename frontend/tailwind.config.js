/** @type {import('tailwindcss').Config} */
import hlmTailwindPreset from '@spartan-ng/brain/hlm-tailwind-preset';


export default {
  presets: [hlmTailwindPreset],
  content: [
    "./src/**/*.{html,ts}",
    "./components/ui/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/assets/images/auth/login/background.webp')",
      },
    },
  },
  plugins: [],
}

