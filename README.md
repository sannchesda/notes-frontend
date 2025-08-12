# notes-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Docker Setup

This application is containerized using Docker for easy deployment and development.

### Environment Configuration

Create a `.env` file for environment-specific settings:

```sh
# Copy the example environment file
cp .env.example .env
```

Configure the following variables in your `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5228/api
```

### Quick Deployment

Use the deployment script for easy setup:

```sh
# Make the script executable (first time only)
chmod +x deploy.sh

# Deploy the application
./deploy.sh
```

### Production Deployment

Build and run the production container:

```sh
# Build the Docker image
docker build -t notes-frontend .

# Run the container
docker run -p 3000:80 notes-frontend
```

Or use Docker Compose:

```sh
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Development with Docker

For development with hot reloading:

```sh
# Run development environment
docker-compose --profile dev up

# Or build and run the dev container directly
docker build -f Dockerfile.dev -t notes-frontend-dev .
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules notes-frontend-dev
```

The development server will be available at `http://localhost:5173`

### Docker Commands

```sh
# Build production image
docker build -t notes-frontend .

# Build development image
docker build -f Dockerfile.dev -t notes-frontend-dev .

# Run production container
docker run -p 3000:80 notes-frontend

# Run development container with volume mounting
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules notes-frontend-dev

# Stop all containers
docker-compose down

# Remove containers and images
docker-compose down --rmi all
```

### Container Details

- **Production**: Multi-stage build using Node.js for building and Nginx for serving
- **Development**: Single-stage build with hot reloading support
- **Port**: Production runs on port 80 (mapped to 3000), Development runs on port 5173
- **Health Check**: Included for production container monitoring
