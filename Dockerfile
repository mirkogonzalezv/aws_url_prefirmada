# Variables
ARG NODE_VERSION=22.12.0
ARG PORT=3000

# Stage 1: Base image
FROM node:$NODE_VERSION-alpine AS base
# RUN apk update && \
#     apk add --no-cache ffmpeg

# Stage 2:  Install packages manager
FROM base AS pnpm-installer
RUN npm i -g pnpm
WORKDIR /app
COPY pnpm-lock.yaml ./
COPY package.json ./

# Stage 3:  Install dependencies
# Stage 3.1: Install dependencies for development
FROM pnpm-installer AS dependencies-dev
RUN pnpm install --frozen-lockfile

# Stage 3.2: Install dependencies for production
FROM pnpm-installer AS dependencies-prod
RUN pnpm install --frozen-lockfile --prod

# Stage 4: Build the app
FROM dependencies-dev AS build
COPY . .
RUN pnpm run build

# Stage 5: Deploy the app
FROM base AS deploy
WORKDIR /app
COPY --from=dependencies-prod /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN adduser -D nonroot
USER nonroot
EXPOSE $PORT
CMD ["node", "dist/main.js"]