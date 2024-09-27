# Vibe Café Application - Getting Started

Welcome to the Vibe Café application! This guide will help you set up and start both the backend and frontend of the project quickly.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Build Commands](#build-commands)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16+ recommended) and npm (Node Package Manager)
- **MySQL** for the database
- **Ionic CLI** (for running the frontend)

To install Ionic CLI, run:

```bash
npm install -g @ionic/cli
```

## Project Structure

The Vibe Café project is structured as follows:

```bash
vibe-cafe/
│
├── backend/         # Backend Node.js application
├── frontend/        # Frontend Ionic application
├── database/        # Database schema 
└── package.json     # Root package.json for managing both backend and frontend
```

## Installation

Follow these steps to install the project dependencies:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/st10147510/vibe-cafe.git
   cd vibe-cafe
   ```

2. **Install dependencies for both backend and frontend:**

   ```bash
   npm run install-all
   ```

> This command will automatically install all necessary packages for both the backend and frontend projects.

3. **Set up the MySQL database:**

   - Create a MySQL database named `vibe_cafe`.
   - Import the SQL schema:

     ```bash
     mysql -u root -p vibe_cafe < database/schema.sql
     ```

4. **Configure environment variables:**

   - Copy the `.env.example` file to `.env` in both the `backend` and `frontend` directories and update them with your database credentials and any other necessary configuration.

## Running the Project

You can start both the backend and frontend concurrently with the following command:

```bash
npm start
```

- The backend will run on `http://localhost:3000`
- The frontend will run on `http://localhost:8100`

### Starting Individually

If you want to run the backend and frontend separately, you can use:

- **Start Backend Only:**

  ```bash
  npm run start-backend
  ```
  
- **Start Frontend Only:**

  ```bash
  npm run start-frontend
  ```

## Build Commands

To create a production build of both the backend and frontend, use:

```bash
npm run build-all
```

For individual builds:

- **Backend:** `npm run build-backend`
- **Frontend:** `npm run build-frontend`

## Contributing

We welcome contributions! To contribute to the project:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to your branch: `git push origin feature/name`.
5. Open a pull request.

Please refer to the [Contributing Guidelines](./CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

This `README.md` file covers all the essential steps to start and manage the Vibe Café project, making it easy for anyone to set up and run the application.
