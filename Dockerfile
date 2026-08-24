# syntax=docker/dockerfile:1

# ---- Build: compila storybook-static/ ----
FROM node:22-bookworm-slim AS build
WORKDIR /app

# Dependencias (incluye devDependencies: Storybook vive ahí).
# --ignore-scripts: los CSS de tokens ya están commiteados en src/tokens/.
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile --ignore-scripts

# Resto del código y build estático del Storybook → storybook-static/
COPY . .
RUN pnpm build-storybook

# ---- Serve: nginx sirve los estáticos ----
FROM nginx:alpine AS serve
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
