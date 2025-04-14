# Portfolio Website Frontend

## Project Overview

This is a modern, full-stack portfolio website built with Next.js 15 and React 19, designed to showcase professional work and provide advanced analytics.

## Technologies

### Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Tanstack Query
- **Animations**: GSAP, Framer Motion
- **UI Components**: Radix UI
- **File Handling**: FilePond

### Features
- Responsive portfolio template
- Visitor analytics tracking
- Animated UI interactions
- Dynamic content management

## Project Structure

```
/src
├── app/           # Next.js app router pages and layouts
├── components/    # Reusable UI components
├── constants/     # Application constants
├── features/      # Feature-based modules
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── providers/     # React context providers
├── services/      # API service layer
└── styles/        # Global styles
```

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Testing

Run end-to-end tests:
```bash
npm run test:e2e
# or
yarn test:e2e
```

## Deployment

The application is configured for easy deployment on Vercel or similar platforms.

## Contributing

Please read the contributing guidelines before making any changes.
