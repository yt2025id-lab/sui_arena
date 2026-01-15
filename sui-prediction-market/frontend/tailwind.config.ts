import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Clean White Theme
        arena: {
          primary: '#FFFFFF',     // White
          secondary: '#F5F5F5',   // Off-white
          accent: '#E0E0E0',      // Light gray
          dark: '#1A1A1A',        // Dark text
          darker: '#000000',      // Black
        },
        // Outcome Colors - Subtle
        yes: {
          light: '#10b981',
          DEFAULT: '#059669',
          dark: '#047857',
        },
        no: {
          light: '#ef4444',
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-arena': 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)',
        'gradient-card': 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(76, 162, 255, 0.2), 0 0 10px rgba(76, 162, 255, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(76, 162, 255, 0.4), 0 0 20px rgba(76, 162, 255, 0.3)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
