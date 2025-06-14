# Use the official Node.js 14 image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files first for better caching
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["sh", "-c", "pnpm prisma generate && pnpm prisma migrate deploy --schema ./prisma/schema.prisma && pnpm run start:prod"]

