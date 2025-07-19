# BareCMS

**BareCMS** is an open-source headless CMS (Content Management System) designed with the bare minimal. It provides a lightweight solution for managing content without the overhead of complex features.

![BareCMS Demo](assets/rec.gif)

## Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Go + Gin + PostgreSQL
- **Deployment**: Docker & Docker Compose

## Quick Start

### Prerequisites

To run BareCMS quickly:

- **Docker**
- **Docker Compose**
- **Make** (optional, for simplified commands)

For local development:

- **Node.js** (for frontend development)
- **Golang** (for backend development)

**Clone and setup**

```bash
  git clone https://github.com/snowztech/barecms.git
  cd barecms
```

**Configure env**

```bash
  cp .env.example .env
```

Edit `.env` and change `JWT_SECRET` to a strong, random string

**Start the application**

```bash
  make up
```

This command will:

- Build the BareCMS Docker image (including the frontend and backend).
- Create and start both the PostgreSQL database and the BareCMS application containers.
- Mount a persistent volume for the PostgreSQL data, ensuring your data is saved even if the containers are removed.

**Access BareCMS:**
  Open your web browser and navigate to [localhost:8080](http://localhost:8080).

### Development Commands

```bash
make up       # Start development environment
make ui       # Build UI (frontend)
make clean    # Stop and cleanup
make logs     # View logs
make help     # Show all commands
```


## 🚀 Deployment

Get BareCMS running in 3 simple steps using Docker.

Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### 🎯 Quick Start (Recommended)

**Step 1: Create your project folder**

```sh
mkdir barecms-app
cd barecms-app
```

**Step 2: Create configuration files**

Create `.env` file:

```env
# Security (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-here

# Database Configuration
POSTGRES_USER=barecms_user
POSTGRES_PASSWORD=your-secure-password
POSTGRES_DB=barecms_db
DATABASE_URL=postgresql://barecms_user:your-secure-password@postgres:5432/barecms_db

# Application
PORT=8080
```

💡 **Generate a secure JWT secret**: `openssl rand -base64 32`



Create a `docker-compose.yml` file with the following content:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    env_file: .env # Loads database credentials from .env
    volumes:
      - postgres_data:/var/lib/postgresql/data # Persistent data volume
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  barecms:
    image: ghcr.io/snowztech/barecms:latest # Pulls the latest pre-built image from GHCR
    ports:
      - "${PORT:-8080}:8080" # Maps host port 8080 to container port 8080
    env_file: .env # Loads application configuration from .env
    depends_on:
      postgres:
        condition: service_healthy # Ensures BareCMS starts only after PostgreSQL is ready
    restart: unless-stopped

volumes:
  postgres_data: # Defines the named volume for PostgreSQL data persistence
```

**Step 3: Launch BareCMS**

```sh
docker-compose up -d
```

**🎉 That's it!**

BareCMS is now running at `http://localhost:8080


### 🛠️ Management Commands

```sh
# View logs
docker compose logs -f

# Stop BareCMS
docker compose down

# Update to latest version
docker compose pull && docker compose up -d

# Backup database
docker compose exec postgres pg_dump -U barecms_user barecms_db > backup.sql

# Query database
docker exec -it barecms-postgres-1 psql -U barecms_user -d barecms_db -c 'SELECT id, email FROM users;'
```

### 🔧 Alternative: Docker Only

If you prefer running Docker directly without Compose:

```sh
# 1. Start PostgreSQL
docker run -d --name barecms-postgres \
  -e POSTGRES_USER=barecms_user \
  -e POSTGRES_PASSWORD=your-secure-password \
  -e POSTGRES_DB=barecms_db \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:16-alpine

# 2. Start BareCMS (wait ~30 seconds for postgres to be ready)
docker run -d --name barecms-app \
  -p 8080:8080 \
  -e JWT_SECRET=your-super-secret-jwt-key-here \
  -e DATABASE_URL=postgresql://barecms_user:your-secure-password@barecms-postgres:5432/barecms_db \
  --link barecms-postgres \
  ghcr.io/snowztech/barecms:latest
```


## Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for detailed instructions.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
