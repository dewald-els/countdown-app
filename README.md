# Countdown App

A beautiful countdown timer PWA to track important events. Built with React, TypeScript, and Tailwind CSS.

## Features

- Clean, mobile-first design with soft pastel blue theme
- Animated circular progress indicator with emoji that changes expression
- Playful background pattern with hearts, shapes, and geometric elements
- Real-time countdown showing days, hours, minutes, and seconds
- Confetti celebration when the countdown reaches zero
- PWA support - install on iOS/Android home screen
- Auto-updates when new versions are deployed

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui components
- vite-plugin-pwa

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## PWA Installation

### iOS
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"

### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Select "Add to Home Screen"

## Configuration

Edit the countdown event in `src/App.tsx`:

```tsx
const COUNTDOWN_EVENT = {
  id: 'main',
  name: 'The Big Day',
  targetDate: '2026-08-06T00:00:00',
  createdAt: '2025-05-23T00:00:00',
  notified: false,
  emoji: '✈️',
};
```

## Deployment

The app is configured to deploy to GitHub Pages at `/countdown-app/`. Run:

```bash
npm run build
```

Then deploy the `dist` folder to your hosting provider.
