# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Rafael Fragoso's personal website - a Next.js application built with TypeScript, React 19, and Tailwind CSS. The site uses Biome for linting and formatting instead of ESLint/Prettier.

## Development Commands

- **Install dependencies**: `bun install`
- **Development server**: `bun dev` (Turbopack is now default in Next.js 16)
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
- **Framework**: Next.js 16.0.0 with App Router
- **Runtime**: React 19.2.0 (with stable React Compiler)
- **Styling**: Tailwind CSS v4.1.16
- **Icons**: Lucide React 0.548.0 + Radix UI icons
- **UI Components**: Radix UI primitives + custom shadcn/ui components (latest)
- **Forms**: React Hook Form 7.62.0 + Zod 4.1.12 validation
- **Theme**: next-themes for dark/light mode
- **Analytics**: Plausible (self-hosted at plausible.workbits.io)
- **Package Manager**: Bun
- **Linting**: Biome 2.3.2 (replaces ESLint/Prettier)

### Code Standards
- Uses Biome for linting and formatting (configured in `biome.json`)
- TypeScript strict mode enabled
- Single quotes, semicolons as needed, 120 line width
- 2-space indentation
- JSX brackets on same line

### Configuration Files
- `biome.json` - Biome 2.3.2 linter/formatter configuration (migrated from 1.9.4)
- `components.json` - shadcn/ui component configuration
- `next.config.ts` - Next.js 16 config with Cache Components and React Compiler enabled
- `tailwind.config.ts` - Tailwind CSS v4.1.16 configuration
- `tsconfig.json` - TypeScript 5.9.3 configuration

### Site Configuration
- Site metadata and social links are centralized in `src/config/site.ts`
- Navigation is configured in `src/config/navigation.ts`
- The site uses a centralized layout with header/footer components

### Docker
- Uses multi-stage Docker build with Node.js Alpine
- Configured for standalone output mode
- Runs on port 3000 in container

### Next.js 16 Features

This project leverages the following Next.js 16 and React 19.2 features:

#### Enabled Features
- **Cache Components**: Enabled via `cacheComponents: true` in `next.config.ts` - replaces deprecated PPR experimental flag. Enables Partial Prerendering (PPR) and explicit caching with the `"use cache"` directive.
- **React Compiler**: Enabled via `reactCompiler: true` in `next.config.ts` - automatically memoizes components without manual code changes
- **View Transitions**: Enabled via `ViewTransitions` component in providers - provides smooth page transitions when navigating between routes
- **useEffectEvent Hook**: Used in `navigation-menu.tsx`, `vertical-list.tsx`, and `command-provider.tsx` to create stable event handlers that don't trigger unnecessary effect re-runs
- **Activity Component**: React 19's `<Activity/>` component used for loading states in `mapbox.tsx` and `about/page.tsx`

#### Automatic Features
- **Turbopack Default**: Turbopack is now the default bundler (removed `--turbopack` flags)
- **Enhanced Routing**: Better layout deduplication and incremental prefetching (automatic)
- **Enhanced Caching**: Improved revalidation support in fetch calls

#### Breaking Changes Handled
- Removed deprecated `eslint` config from `next.config.ts` (use `next lint` command separately)
- React Compiler flag promoted from experimental to stable (`reactCompiler: true`)
- Turbopack flags removed (now default)