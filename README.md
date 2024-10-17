# big-data-management-system

# FastAPI NewsAPI Backend with MongoDB

## Project Setup

### Prerequisites

- Docker
- Docker Compose (optional if using `docker-compose.yml`)

### Running the Project

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Build and run the services (if using Docker):
   ```bash
   docker-compose up --build

4. The FastAPI backend will be running at http://localhost:8000.

Environment Variables

    MONGO_URL: MongoDB connection string located in .env.

Available Endpoints

    GET /publishers: Fetch all stored publishers.


---

### Steps to Start:

1. Clone or create the directory structure as shown.
2. Place the code snippets in their respective files.
3. Open a terminal in the `backend` directory.
4. Run `docker-compose up --build` (if using Docker Compose) or run `uvicorn app.main:app --host 0.0.0.0 --port 8000` manually to start the backend and MongoDB.

This setup supports `.env` reading via `config.py` and uses your preferred project structure. Let me know if you need any further refinements!
