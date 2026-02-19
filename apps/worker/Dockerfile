FROM node:20-alpine

WORKDIR /app

# Copy root package files and workspace packages so npm can resolve local workspace deps
COPY package.json package-lock.json ./
COPY packages ./packages
COPY apps/worker/package.json ./apps/worker/package.json

RUN npm install --omit=dev

COPY apps/worker/dist ./apps/worker/dist

WORKDIR /app/apps/worker
CMD ["node", "dist/worker.js"]
