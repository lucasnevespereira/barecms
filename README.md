# BareCMS

**BareCMS** is an open-source headless CMS (Content Management System) designed with the bare minimal. It provides a lightweight solution for managing content without the overhead of complex features.

![BareCMS Demo](assets/rec.gif)

## Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Go + Gin + PostgreSQL
- **Deployment**: Docker & Docker Compose

## Current Status

**Work in Progress**: The project is under active development and may not be complete.

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

## Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for detailed instructions.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
