/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#00FF88',
        secondary: '#39FF14',
        accent: '#CCCCCC',
      },
      screens: {
        'xs': '475px',
        'sm': '600px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 136, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': { textDecoration: 'underline' },
            },
            h1: {
              color: theme('colors.white'),
              fontWeight: '800',
              letterSpacing: '-0.02em',
            },
            h2: {
              color: theme('colors.white'),
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            h3: {
              color: theme('colors.white'),
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            p: {
              color: theme('colors.gray.700'),
              lineHeight: '1.75',
            },
            'ul > li::marker': {
              color: theme('colors.primary'),
            },
            'ol > li::marker': {
              color: theme('colors.primary'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary'),
              paddingLeft: '1rem',
            },
            hr: {
              borderColor: theme('colors.gray.300'),
            },
            img: {
              borderRadius: theme('borderRadius.xl'),
            },
            code: {
              color: theme('colors.white'),
              backgroundColor: theme('colors.gray.900'),
              borderRadius: theme('borderRadius.md'),
              padding: '0.15rem 0.35rem',
              border: `1px solid ${theme('colors.primary')+'33'}`,
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              border: '0',
            },
            pre: {
              backgroundColor: 'rgba(17,24,39,0.6)',
              border: `1px solid ${theme('colors.gray.800')}`,
              borderRadius: theme('borderRadius.xl'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.accent'),
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': { textDecoration: 'underline' },
            },
            h1: {
              color: theme('colors.white'),
              fontWeight: '800',
              letterSpacing: '-0.02em',
            },
            h2: {
              color: theme('colors.white'),
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            h3: {
              color: theme('colors.white'),
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            p: {
              color: theme('colors.accent'),
              lineHeight: '1.75',
            },
            'ul > li::marker': {
              color: theme('colors.primary'),
            },
            'ol > li::marker': {
              color: theme('colors.primary'),
            },
            blockquote: {
              color: theme('colors.accent'),
              borderLeftColor: theme('colors.primary'),
              backgroundColor: 'rgba(17,24,39,0.4)',
              paddingLeft: '1rem',
            },
            hr: {
              borderColor: theme('colors.gray.800'),
            },
            img: {
              borderRadius: theme('borderRadius.xl'),
            },
            code: {
              color: theme('colors.white'),
              backgroundColor: 'rgba(17,24,39,0.9)',
              borderRadius: theme('borderRadius.md'),
              padding: '0.15rem 0.35rem',
              border: `1px solid ${theme('colors.primary')+'33'}`,
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              border: '0',
            },
            pre: {
              backgroundColor: 'rgba(17,24,39,0.6)',
              border: `1px solid ${theme('colors.gray.800')}`,
              borderRadius: theme('borderRadius.xl'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};