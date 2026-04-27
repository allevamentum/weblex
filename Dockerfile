# --- Stage 1: Build ---
FROM node:22-alpine AS build
WORKDIR /app

# Copy package metadata and install fresh (no lockfile so deps resolve for linux)
COPY package.json ./
RUN npm install --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# --- Stage 2: Serve ---
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve@14
COPY --from=build /app/dist ./dist

ENV PORT=3000
EXPOSE 3000
CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]
