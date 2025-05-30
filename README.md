# EmptyCup - Local Development Setup

This guide explains how to set up and run the EmptyCup application locally using Docker and Docker Compose.

## Local Development Setup

To run this application locally using Docker Compose, follow these steps:

### Prerequisites

* **Git:** Make sure you have Git installed to clone the repository.
* **Docker Desktop:** Install Docker Desktop (includes Docker Engine and Docker Compose) for your operating system.
    * [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation and Running

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd emptycup-app
    ```
    *(Replace `<your-repo-url>` with the actual URL of your Git repository)*

2.  **Ensure correct project structure:**
    Your project should be organized as follows (Dockerfiles and config files at the root, code in `frontend/` and `backend/`):

    ```
    emptycup-app/
    ├── frontend/
    │   ├── index.html
    │   └── style.css
    │   └── script.js
    ├── backend/
    │   ├── app.py
    │   └── requirements.txt
    ├── Dockerfile.backend
    ├── Dockerfile.frontend
    ├── nginx.conf
    └── docker-compose.yml
    └── README.md
    ```

3.  **Build and run the Docker containers:**
    Navigate to the root of the `emptycup-app` directory (where `docker-compose.yml` is located) in your terminal and run:
    ```bash
    docker-compose up --build
    ```
    * This command will build the necessary Docker images and start both the frontend (Nginx) and backend (Flask) services.

4.  **Access the application:**
    Once the containers are up and running, open your web browser and navigate to:
    ```
    http://localhost/
    ```

5.  **Stopping the application:**
    To stop and remove the running containers, press `Ctrl+C` in your terminal where `docker-compose up` is running, then execute:
    ```bash
    docker-compose down