# Chess Tournament Application

A full-stack chess tournament management application built Django + NextJS and docker.

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker
- Docker Compose
- Git

## Project Structure

```
chess-tournament/
├── backend/         # Backend API service
├── frontend/        # Frontend application
├── docker-compose.yaml
└── README.md
└── ...
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chess-tournament
   ```

2. Create the Docker network:
   ```bash
   docker network create app-network
   ```

3. Start the application:
   ```bash
   docker-compose up
   ```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:8000
- Database: PostgreSQL running on port 5432

## Services

### Backend
- Built with Django
- Runs on port 8000
- Connected to PostgreSQL database

### Frontend
- Built with Next.js
- Runs on port 3001
- Connected to backend API

### Database
- PostgreSQL 15
- Credentias in docker-compose.yaml

## Stopping the Application

To stop the application, press `Ctrl+C` in the terminal where docker-compose is running, or run:
```bash
docker-compose down
```

To remove all data including the database volume:
```bash
docker-compose down -v
```

## Troubleshooting

If you encounter any issues:

1. Ensure all ports (3001, 8000, 5432) are available
2. Check if the Docker network exists
3. Try rebuilding the containers:
   ```bash
   docker-compose down
   docker-compose up --build
   ```  

# Improvements
## Frontend  
- Display loading spinner on submit forms and change pages
