# Development environment with hot reload
FROM node:22-alpine

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose dev server port
EXPOSE 4200

# Start development server with hot reload
# --host 0.0.0.0 allows external connections
# --poll 2000 enables file watching in Docker
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]