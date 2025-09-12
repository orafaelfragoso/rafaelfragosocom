# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Rafael Fragoso's personal website - a Next.js application built with TypeScript, React 19, and Tailwind CSS. The site uses Biome for linting and formatting instead of ESLint/Prettier.

## Development Commands

- **Install dependencies**: `bun install`
- **Development server**: `bun dev` (runs with Turbopack)
- **Build**: `bun build`
- **Start production**: `bun start`
- **Lint**: `bun lint` (runs Biome check)
- **Format**: `bunx @biomejs/biome format --write .`
- **Check code**: `bunx @biomejs/biome check --write .`

## Architecture

### Key Directories
- `src/app/` - Next.js App Router pages and layouts
- `src/app/api/` - API routes (Discord, Strava integrations)
- `src/components/` - React components
- `src/components/ui/` - Reusable UI components (shadcn/ui style)
- `src/config/` - Site configuration and navigation
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and shared logic
- `src/types/` - TypeScript type definitions

### Tech Stack
- **Framework**: Next.js 15.5.3 with App Router
- **Runtime**: React 19.1.1 (with experimental React Compiler)
- **Styling**: Tailwind CSS v4.1.13
- **Icons**: Lucide React 0.544.0 + Radix UI icons
- **UI Components**: Radix UI primitives + custom shadcn/ui components (latest)
- **Forms**: React Hook Form 7.62.0 + Zod 4.1.8 validation
- **Theme**: next-themes for dark/light mode
- **Analytics**: Plausible (self-hosted at plausible.workbits.io)
- **Package Manager**: Bun
- **Linting**: Biome 2.2.4 (replaces ESLint/Prettier)

### Code Standards
- Uses Biome for linting and formatting (configured in `biome.json`)
- TypeScript strict mode enabled
- Single quotes, semicolons as needed, 120 line width
- 2-space indentation
- JSX brackets on same line

### Configuration Files
- `biome.json` - Biome 2.2.4 linter/formatter configuration (migrated from 1.9.4)
- `components.json` - shadcn/ui component configuration
- `next.config.js` - Next.js config with React Compiler enabled
- `tailwind.config.ts` - Tailwind CSS v4 configuration
- `tsconfig.json` - TypeScript 5.9.2 configuration

### Site Configuration
- Site metadata and social links are centralized in `src/config/site.ts`
- Navigation is configured in `src/config/navigation.ts`
- The site uses a centralized layout with header/footer components

### Docker
- Uses multi-stage Docker build with Node.js Alpine
- Configured for standalone output mode
- Runs on port 3000 in container