# MoveEaze

MoveEaze is a web application that allows users to search for movie details by movie title and manage a personalized list of favorite movies.

## Features

- Search for movie details by movie title
- View detailed information including cast, crew, release dates, awards, and ratings
- Add movies to a favorites list
- View and manage favorite movies
- Remove movies from the favorites list

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js and npm installed
- `.env` files configured for both frontend and backend (see below)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/moveeaze.git
   cd moveeaze
   ```

2. Install dependencies for both frontend and backend:

  ```bash
  cd backend
  npm install

  cd ../frontend
  npm install
  ```

3. Create .env files in both frontend and backend directories.

  Frontend .env:

  VITE_SERVER_URL=http://localhost:5000
  VITE_CLIENT_URL=http://localhost:5173

  Backend .env:

  PORT=5000
  SERVER_URL=http://localhost:5000
  CLIENT_URL=http://localhost:5173
  API_URL=http://www.omdbapi.com/?apikey={API_KEY} // Replace with your api key
  NODE_ENV=development

4. Running the App Locally

Start the backend server:

  ```bash
  cd backend
  npm run dev
  Start the frontend development server:
  ```
  ```bash
  cd frontend
  npm run dev
  ```

The application will be accessible at http://localhost:5173.

5. Deployment

The app will be deployed soon. Once live, the deployed URL will be added here.

Author
Muhammad Uvais