# React-Jambon

A React application built with Vite and TypeScript that serves articles from a JSON-based content management system.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for Production

```bash
# Build the application
npm run build
```

This will:
1. Generate the article manifest
2. Clean and process articles
3. Build the application

The built files will be in the `dist` directory, ready to be served by any web server.

## Features

- React + TypeScript + Vite for fast development
- JSON-based article management*
- Docker support for production deployment
- Hot Module Replacement (HMR)*
*Not yet available due to major CORS violations. If you have sugestions feel free to fork the repo

## About 
This is a litle school progect, made for the school newspaper. The articles are in a semi-propriatary format witch i made a formating tool for [here](https://github.com/t0t0r0-cat/BeanPycager/)
