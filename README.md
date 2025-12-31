# README

This is a full-stack application with a React-based frontend and a Node.js backend.

## Technologies Used

- **Frontend:** React, Ionic, Vite, Axios
- **Backend:** Node.js, Express, TypeScript, Ngrok
- **Database:** ADODB

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/your_project_name.git
   ```
2. Install backend NPM packages
   ```sh
   cd backend
   npm install
   ```
3. Create a `.env` file in the backend directory and add the necessary environment variables. See `.env.example` for reference.
4. Start the backend server
   ```sh
   npm run dev
   ```
5. Install frontend NPM packages
   ```sh
   cd ../frontend
   npm install
   ```
6. Start the frontend server
   ```sh
   npm run dev
   ```

## Project Structure

```
.
├── backend
│   ├── src
│   │   ├── middlewares
│   │   ├── routes
│   │   ├── utils
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   └── App.tsx
│   ├── public
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Available Scripts

### Backend

- `npm run build`: Compiles the TypeScript code.
- `npm run start`: Starts the server from the compiled code.
- `npm run dev`: Starts the server in development mode with live reloading.
- `npm run format`: Formats the code with Prettier.

### Frontend

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build.
- `npm run test.e2e`: Runs end-to-end tests with Cypress.
- `npm run test.unit`: Runs unit tests with Vitest.
- `npm run lint`: Lints the code with ESLint.

## API Endpoints

### Users

- `POST /users/login`: User login.
- `GET /users/me`: Get user profile.

### Customers

- `GET /customers`: Get all customers.

### Transactions

- `POST /transactions`: Add a new transaction.
- `GET /transactions`: Get all transactions.
