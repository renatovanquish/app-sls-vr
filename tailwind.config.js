module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  options: {
    safelist: {
      standard: ['outline-none'],
    },
  },
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      colors: {
        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        tertiary: 'var(--tertiary)',
        'tertiary-2': 'var(--tertiary-2)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accent-0': 'var(--accent-0)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
        'accent-9': 'var(--accent-9)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accent-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        120: '1.2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#0093D1',
          secondary: '#F000B8',
          accent: '#37CDBE',
          neutral: '#263238',
          'base-100': '#FFFFFF',
          info: '#1b9ce2',
          success: '#37b679',
          warning: '#FBBD23',
          error: '#da3c3c',
        },
      },
    ],
    logs: false,
  },
}
