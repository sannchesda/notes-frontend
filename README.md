# Notes Frontend

A modern Vue.js application for managing personal notes with full CRUD functionality, built with TypeScript and Tailwind CSS.

## 🚀 Live Demo

The application is deployed on GitHub Pages: [View Live Demo](https://sannchesda.github.io/notes-frontend/)

## ✨ Features

- **Full CRUD Operations**: Create, read, update, and delete notes
- **User Authentication**: Secure login and registration system
- **Search & Filter**: Find notes quickly with search functionality
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Instant feedback and loading states
- **Modern Tech Stack**: Vue 3, TypeScript, Tailwind CSS, Pinia

## 🛠 Technology Stack

- **Frontend**: Vue 3, TypeScript, Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📋 Prerequisites

- Node.js (v20.19.0 or higher)
- npm or yarn
- Git

## 🔧 Installation & Development

### Clone the Repository

```sh
git clone https://github.com/sannchesda/notes-frontend.git
cd notes-frontend
```

### Install Dependencies

```sh
npm install
```

### Environment Configuration

Create environment files for different environments:

```sh
# Development environment
cp .env.development .env.local
```

Configure your API endpoint in `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5228/api
```

### Development Server

```sh
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment (Recommended)

1. **Fork or clone this repository**

2. **Update the API URL** in `.github/workflows/deploy.yml`:
   ```yaml
   env:
     VITE_API_BASE_URL: https://your-actual-backend-api.com/api
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

4. **Push your changes**:
   ```sh
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

5. **Wait for deployment**: The GitHub Action will automatically build and deploy your app

### Manual Deployment

If you prefer manual deployment:

```sh
# Build and deploy manually
npm run deploy
```

### Deployment Configuration

The project includes several deployment-related configurations:

- **Base URL**: Automatically set to `/notes-frontend/` for GitHub Pages
- **SPA Routing**: Configured with 404.html fallback for client-side routing
- **Environment Variables**: Separate configs for development and production
- **GitHub Actions**: Automated CI/CD pipeline

## 🐳 Docker Setup

### Quick Deployment

```sh
# Make the script executable (first time only)
chmod +x deploy.sh

# Deploy the application
./deploy.sh
```

### Production Deployment

```sh
# Build and run with Docker Compose
docker-compose up --build

# Or run detached
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Development with Docker

```sh
# Run development environment with hot reloading
docker-compose --profile dev up
```

The development server will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── NoteCard.vue    # Individual note display
│   └── NoteModal.vue   # Note creation/editing modal
├── router/             # Vue Router configuration
├── services/           # API service layer
├── stores/             # Pinia state management
│   ├── auth.ts        # Authentication store
│   └── notes.ts       # Notes data store
├── views/              # Page components
│   ├── LoginView.vue   # Login page
│   ├── NotesView.vue   # Main notes page
│   └── RegisterView.vue # Registration page
└── assets/             # Static assets and styles
```

## 🔑 API Integration

The application is designed to work with a RESTful backend API. Configure your API endpoint in the environment files:

```env
# Development
VITE_API_BASE_URL=http://localhost:5228/api

# Production
VITE_API_BASE_URL=https://your-production-api.com/api
```

### API Endpoints Expected

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /notes` - Fetch user notes
- `POST /notes` - Create new note
- `PUT /notes/{id}` - Update note
- `DELETE /notes/{id}` - Delete note

## 🧪 Available Scripts

```sh
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Deployment
npm run deploy          # Deploy to GitHub Pages
npm run deploy:ci       # CI deployment script

# Docker
npm run docker:build    # Build production Docker image
npm run docker:run      # Run production container
npm run docker:up       # Docker Compose up
npm run docker:down     # Docker Compose down

# Development with Docker
npm run docker:build-dev # Build development Docker image
npm run docker:run-dev   # Run development container
npm run docker:up-dev    # Docker Compose development
```

## 🔒 Security Features

- JWT token-based authentication
- Protected routes with navigation guards
- Secure API communication
- Input validation and sanitization

## 🎨 UI/UX Features

- Clean, modern interface
- Responsive design for all screen sizes
- Loading states and error handling
- Smooth animations and transitions
- Intuitive navigation and interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **API Connection Issues**: Ensure your backend API is running and the URL is correct in your environment file
2. **Build Errors**: Make sure all dependencies are installed with `npm install`
3. **Routing Issues**: Verify that your server supports client-side routing or use the provided 404.html fallback

### Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Provide steps to reproduce the problem

---

Made with ❤️ using Vue.js and TypeScript
