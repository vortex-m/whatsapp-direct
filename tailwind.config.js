/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: 'var(--base)',
        text: 'var(--text)',
        prime: 'var(--prime)',
        second: 'var(--second)',
        header: 'var(--header)',
      },
    },
  },
  plugins: [],
};
