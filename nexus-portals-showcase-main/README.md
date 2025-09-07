# Nexus Portfolio Showcase

Animated developer portfolio built with React, TypeScript, Vite and Tailwind. Includes smooth GSAP section animations, a preloader, and configurable snowfall/star backgrounds.

## Features

- Animated preloader with name and role
- Sections: Hero, About, Projects, Contact
- Colored snowfall/star backgrounds per section
- GSAP ScrollTrigger transitions
- Responsive UI using Tailwind and shadcn/ui

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- GSAP (ScrollTrigger)

## Getting Started

```sh
npm i
npm run dev
```

Build for production:

```sh
npm run build
npm run preview
```

## Customization

- Change preloader name and subtitle:
  - File: `src/components/Preloader.tsx`
  - Replace the `<h1>` text (currently shows the name) and optional subtitle under it.

- Colored snowfall or stars per section:
  - File: `src/components/AnimatedBackground.tsx` (reusable component)
  - Usage examples:
    - About: `src/components/AboutSection.tsx`
    - Projects: `src/components/ProjectsSection.tsx`
  - Props:
    - `mode`: `'snow' | 'stars'`
    - `density`: number (heavier snowfall → larger value, e.g. 0.4–0.6)
    - `colors`: `string[]` (hex colors for snowflakes)

- Social links and email:
  - File: `src/components/ContactSection.tsx`
  - Update URLs in `socialLinks` and email address in the form/footer.

## Deploy

You can deploy to any static host (Vercel, Netlify, GitHub Pages):

```sh
npm run build
# deploy the dist/ directory to your host
```

## License

MIT
