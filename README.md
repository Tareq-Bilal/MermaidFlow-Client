# Mermaid Flow
A modern, responsive landing page for Mermaid Flow built with Next.js and a custom design system.

<img width="1920" height="1080" alt="Gemini_Generated_Image_cbehp1cbehp1cbeh" src="https://github.com/user-attachments/assets/c60cb455-2b57-486d-b925-8ef395fd1608" />


## About

Mermaid Flow is a visual diagram tool that simplifies technical documentation. Create beautiful flowcharts, sequence diagrams, class diagrams, and more using a simple text-based syntax. 

### Features

- **Visual Diagrams** - Create flowcharts, sequence diagrams, ER diagrams, and more
- **Text-Based** - Define diagrams using simple Markdown-like syntax
- **Real-time Rendering** - See your diagrams render instantly as you type
- **Export Options** - Download diagrams in PNG, SVG, or PDF formats
- **Collaboration** - Share and collaborate with your team

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   └── page.tsx        # Home page
├── components/
│   ├── Hero/          # Hero section component
│   └── shared/        # Reusable design system components
│       ├── Text/
│       ├── Container/
│       ├── Image/
│       ├── Flex/
│       ├── FlexItem/
│       ├── Grid/
│       ├── GridItem/
│       ├── Card/
│       ├── Button/
│       └── Nav/
└── styles/
    ├── tokens.css     # Design tokens (CSS variables)
    ├── components.ts # Component type definitions
    └── globals.css  # Global reset & base styles
```

## Design System

### Color Tokens
- `--color-bg-primary`: Background color
- `--color-text-primary`: Primary text
- `--color-accent-primary`: Accent color (red)
- `--color-accent-blue`: Blue accent
- `--color-accent-green`: Green accent
- `--color-surface-100`: Surface background

### Spacing Tokens

| Token | Value |
|-------|-------|
| `--spacing-1` | 1px |
| `--spacing-4` | 4px |
| `--spacing-8` | 8px |
| `--spacing-16` | 16px |
| `--spacing-24` | 24px |
| `--spacing-32` | 32px |
| `--spacing-64` | 64px |
| `--spacing-120` | 120px |
| `--spacing-160` | 160px |

### Typography Tokens

| Token | Value |
|-------|-------|
| `--font-size-display` | 64px |
| `--font-size-heading` | 24px |
| `--font-size-body` | 16px |
| `--font-size-caption` | 14px |

### Breakpoints

| Name | Size |
|------|------|
| Mobile | < 640px |
| Tablet | 640px - 899px |
| Small Laptop | 900px - 1023px |
| Desktop | 1024px - 1279px |
| Large Desktop | ≥ 1280px |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
