# Introduction

ResourceMap is a demo project for testing out TypeScript, socket.io, sqlite, react, express, and bun.

## Routes

- `/` - Renders the main application page with the map and conflict zones.
- `/api/zones` - API endpoint to fetch the list of conflict zones.

## Libraries Used

- Backend:
  - Node.js with TypeScript
  - Express.js for API routes
  - SQLite3 for database storage
- Frontend:
  - React 18 with TypeScript
  - Tailwind CSS for styling

## Running the Application

To run the application using Docker, use the following commands:

`docker build -t conflict-zone-map .`
`docker run -p 8001:8001 conflict-zone-map`

Open http://localhost:8001 in your browser to view the application.