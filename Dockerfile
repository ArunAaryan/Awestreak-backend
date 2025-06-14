# Use the official Node.js 14 image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


# Copy the rest of the application code
copy ./prisma prisma
COPY . .

RUN npx prisma migrate deploy --schema ./prisma/schema.prisma
RUN npx prisma generate
# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "run", "start:prod"]

