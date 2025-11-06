# Build stage
FROM node:25-alpine AS builder
WORKDIR /app

# Copy only package files for better caching
COPY package*.json bun.lock* ./
RUN npm install

# Disable telemetry during runtime if desired
ENV NEXT_TELEMETRY_DISABLED=1

# Accept environment variables as build arguments
ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
ARG IPAPI_TOKEN

# Set environment variables for Next.js build (NEXT_PUBLIC_* must be set at build time)
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
ENV IPAPI_TOKEN=${IPAPI_TOKEN}

# Copy source files and build the app
COPY . .
RUN npm run build

# Production stage
FROM oven/bun:1.3-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Accept runtime environment variables
ARG IPAPI_TOKEN
ENV IPAPI_TOKEN=${IPAPI_TOKEN}

# Install wget and curl
RUN apt-get update && \
    apt-get install -y wget curl --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 nextjs

# Copy only the necessary files from the build stage
COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:bunjs /app/public ./public

# Set proper permissions
USER nextjs

# Configure environment
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["bun", "--bun", "server.js"]