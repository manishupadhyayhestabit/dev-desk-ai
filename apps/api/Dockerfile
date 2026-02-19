FROM node:20-alpine

WORKDIR /app

# Copy root package files and workspace packages so npm can resolve local workspace deps
COPY package.json package-lock.json ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/package.json

# Install production dependencies (workspace-aware since root package.json defines workspaces)
RUN npm install --omit=dev

# Copy the built output of the api package (assumes you built locally before building the image)
COPY apps/api/dist ./apps/api/dist

WORKDIR /app/apps/api
EXPOSE 5000

CMD ["node", "dist/server.js"]
