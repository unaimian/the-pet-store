# The Pet Store

The Pet Store is a sample Angular application showcasing how to build a modern e-commerce website using Hygraph CMS and GraphQL. The application allows users to browse various product categories, view detailed product information, add products to the shopping cart, and complete the checkout process.

## Prerequisites

- Node.js (v16.x or later)
- npm (v8.x or later) or yarn (v1.22.x or later)
- Angular CLI (v15.x or later)

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

2. Configure the environment: (This step is optional if you don't want to use your own Hygraph project)

   Update the GraphQL API URL in `src/environments/environment.ts` with your Hygraph project endpoint.
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://api-<region>.hygraph.com/v2/<your-project-id>/master'
   };
   ```

## Development Server

Run the development server with:

```bash
npm run start
```

Navigate to `http://localhost:4200/` in your browser.

## Build

To build the project for production:

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/              # Shared components
│   ├── core/                    # Core functionality
│   │   ├── models/              # Data models and interfaces
│   │   ├── services/            # Application services
│   │   └── graphql/             # GraphQL queries
│   ├── pages/                   # Page components
│   └── shared/                  # Shared modules and utilities
├── environments/                # Environment configuration
└── styles/                      # Global styles
```
