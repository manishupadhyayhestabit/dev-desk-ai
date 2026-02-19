FROM node:20-alpine

WORKDIR /app

# Copy root package files and workspace packages so npm can resolve local workspace deps
COPY package.json package-lock.json ./
COPY packages ./packages
COPY apps/frontend/package.json ./apps/frontend/package.json

RUN npm install --omit=dev

COPY apps/frontend/.next ./.next
COPY apps/frontend/public ./public

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
