# Build stage
FROM oven/bun:1.2-slim AS builder
WORKDIR /app

# Copy only package files for better caching
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Disable telemetry during runtime if desired
ENV NEXT_TELEMETRY_DISABLED=1

# Copy source files and build the app
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:1.2-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

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
CMD ["bun", "server.js"]