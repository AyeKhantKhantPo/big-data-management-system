# Big Data Management System and Reporting Dashboard

## Overview:

The system has three key components: a Python script that collects data from NewsAPI and stores it in MongoDB, running on a cron job. The data visualization and reporting layer is a front-end dashboard that displays and reports the stored data, offering search, filter, and CSV export features.

![BDMS Diagram](docs/image/BDMS.png)

## Tech Stack
### Backend:
- **Language**: Python (FastAPI) - For building the API to manage and serve data.
- **Database**: MongoDB (NoSQL) - To store the collected news publisher data.
- **Scheduler**: Cron Job - To periodically run the data collection script from NewsAPI.

### Frontend:
- **ReactJS + Vite** - For building the user interface.
- **Chart.js/react-chartjs-2** - For data visualization through charts and graphs.
- **Material-UI** - A modern UI framework for responsive and clean design.

### Deployment:
- **Docker** - Containerization for both backend and database services.
- **NPM** - For managing front-end dependencies.

### Prerequisites
1. **Docker** - Install Docker to manage containers.
2. **Docker Compose** - Required to manage multiple services (MongoDB, backend, and frontend).
3. **Node.js & NPM** - Required for the front-end setup and development.
4. **Python (v3.8+)** - Required for running the FastAPI backend.
5. **MongoDB** - A MongoDB instance (either locally or cloud-based).
6. **NewsAPI Key** - Get an API key from [NewsAPI](https://newsapi.org/) for fetching news data.

## Setup Instructions

### Clone the Repository
```bash
$ git clone https://github.com/your-username/big-data-management-system.git
$ cd big-data-management-system
```
### 1. Frontend Setup with NPM
```
$ cd frontend/big-data-ui
$ npm install
$ npm run dev # For Start development server
$ npm run build # Build for production
```

### 2. Backend and MongoDB Setup
```
$ cd backend
$ cp .env.example .env # Update the environment variables in .env as needed
```
- Setup backend service and MongoDB using `docker-compose`:
```
$ docker-compose up --build
```
(OR)
- Setup backend service using `venv`:
```
$ python -m venv .venv
$ source .venv/bin/activate
$ pip install --no-cache-dir -r requirements.txt
$ uvicorn app.main:app --host 0.0.0.0 --port 8000
```
- **Note:** The FastAPI backend will run at http://localhost:8000, and MongoDB will be accessible at port 27017.
- The **Backend API documentation** for the project is available at http://localhost:8000/docs.
![API Doc ](docs/image/api-docs.png)

 ### 3. Cron Job for Data Collection
- The News collector cron job is scheduled to run every 24 hours to fetch the latest updated data.
- Setup script using `venv`:
 ```
 $ source .venv/bin/activate
 $ python -m app.script.news_data_collector
 ```
 (OR)
- Setup script using `docker`:
![cron data collect ](docs/image/cron-data-collect.png)
- Data Collection Log
![data collect log ](docs/image/data-collect-log.png)


## Demo
- The Frontend UI is accessible at http://localhost:5173/
  
- **Dashboard Page:**
![Dashboard](docs/image/dashboard.png)
  
- **List View Page:**
![Data](docs/image/data.png)
  
- **Filter Support in List View:**
![Filter1](docs/image/filter1.png)
![Filter2](docs/image/filter2.png)
  
- **Download Filtered Data as CSV:**
![Download](docs/image/download.png)
