# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy prisma schema
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install

# Copy application source
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start application
CMD ["pnpm", "start:prod"]