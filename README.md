# BareCMS

<div align="center">

![BareCMS Logo](assets/logo.svg)

**A lightweight, open-source headless CMS designed with bare minimalism in mind**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker Pulls](https://img.shields.io/docker/pulls/ghcr.io/snowztech/barecms)](https://github.com/snowztech/barecms/pkgs/container/barecms)
[![Go Report Card](https://goreportcard.com/badge/github.com/snowztech/barecms)](https://goreportcard.com/report/github.com/snowztech/barecms)
[![GitHub release](https://img.shields.io/github/release/snowztech/barecms.svg)](https://github.com/snowztech/barecms/releases)
[![GitHub stars](https://img.shields.io/github/stars/snowztech/barecms.svg?style=social)](https://github.com/snowztech/barecms/stargazers)

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🤝 Contributing](#-contributing) • [💬 Community](#-community)

</div>

---

## 📋 Table of Contents

- [🎬 Demo](#-demo)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Commands](#development-commands)
- [🐳 Deployment](#-deployment)
  - [Docker Compose (Recommended)](#docker-compose-recommended)
  - [Docker Only](#docker-only)
- [📖 Documentation](#-documentation)
- [🧪 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [🗺️ Roadmap](#️-roadmap)
- [💬 Community](#-community)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🎬 Demo

![BareCMS Demo](assets/rec.gif)

_See BareCMS in action - create sites, manage collections, and publish content with ease._

---

## ✨ Features

- **🎯 Minimalist Design**: Clean, intuitive interface focused on content management
- **⚡ Fast & Lightweight**: Built with performance in mind using Go and React
- **🔧 Headless Architecture**: Use any frontend framework or static site generator
- **🐳 Docker Ready**: Easy deployment with Docker and Docker Compose
- **🔐 Secure Authentication**: JWT-based authentication system
- **🗃️ Flexible Content Management**: Support for sites, collections, and entries
- **🚀 Production Ready**: Built with scalability and reliability in mind

## Tech Stack

### Backend

- **[Go](https://golang.org/)** - High-performance backend language
- **[Gin](https://gin-gonic.com/)** - Fast HTTP web framework
- **[PostgreSQL](https://postgresql.org/)** - Reliable relational database

### Frontend

- **[React](https://reactjs.org/)** - Modern UI library
- **[TypeScript](https://typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Fast build tool

### DevOps

- **[Docker](https://docker.com/)** - Containerization
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration

## 🚀 Quick Start

### Prerequisites

**For Quick Deployment:**

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/) (optional, for simplified commands)

**For Local Development:**

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Go](https://golang.org/) (v1.21+ recommended)

### Installation

1. **Clone the repository**

```bash
  git clone https://github.com/snowztech/barecms.git
  cd barecms
```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the `JWT_SECRET` with a strong, random string:

   ```bash
   # Generate a secure JWT secret
   openssl rand -base64 32
   ```

3. **Start the application**

   ```bash
   make up
   ```

4. **Access BareCMS**

   Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

### Development Commands

```bash
make up       # Start development environment
make ui       # Build UI (frontend)
make clean    # Stop and cleanup containers
make logs     # View application logs
make help     # Show all available commands
```

## 🐳 Deployment

### Docker Compose (Recommended)

**Step 1: Create your project directory**

```sh
mkdir barecms-app && cd barecms-app
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

Create a `docker-compose.yml` file with the following content:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    env_file: .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  barecms:
    image: ghcr.io/snowztech/barecms:latest
    ports:
      - "${PORT:-8080}:8080"
    env_file: .env
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  postgres_data:
```

**Step 3: Launch BareCMS**

```bash
docker-compose up -d
```

🎉 **BareCMS is now running at [http://localhost:8080](http://localhost:8080)**

### Management Commands

```sh
# View logs
docker compose logs -f barecms

# Stop BareCMS
docker compose down

# Update to latest version
docker compose pull && docker compose up -d

# Backup database
docker compose exec postgres pg_dump -U barecms_user barecms_db > backup.sql

# Access database shell
docker compose exec postgres psql -U barecms_user -d barecms_db
```

### Docker Only

For direct Docker usage without Compose:

```bash
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

## 📖 Documentation

- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute to BareCMS

---

## 🧪 API Reference

BareCMS provides a RESTful API for content management and public data access.

### 🌐 Public Data Access

- `GET /:siteSlug/data` - **Get all site data publicly** (collections and entries)

_This is the key endpoint for headless usage - create your site with collections and entries, then query all data publicly using your site slug._

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Content Management (Authenticated)

**Sites**

- `GET /api/sites` - List all sites
- `POST /api/sites` - Create a new site
- `GET /api/sites/:id` - Get site details
- `PUT /api/sites/:id` - Update site
- `DELETE /api/sites/:id` - Delete site

**Collections**

- `GET /api/sites/:siteId/collections` - List collections
- `POST /api/sites/:siteId/collections` - Create collection
- `GET /api/collections/:id` - Get collection details
- `PUT /api/collections/:id` - Update collection
- `DELETE /api/collections/:id` - Delete collection

**Entries**

- `GET /api/collections/:collectionId/entries` - List entries
- `POST /api/collections/:collectionId/entries` - Create entry
- `GET /api/entries/:id` - Get entry details
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test them thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to your branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow Go best practices and conventions
- Update documentation when needed
- Use conventional commit messages
- Ensure your code passes all CI checks

For detailed contributing guidelines, see [CONTRIBUTING.md](docs/CONTRIBUTING.md).

---

## 🗺️ Roadmap

### 🔄 Current Focus

- [ ] Enhanced documentation
- [ ] Basic user roles and permissions
- [ ] Content import/export

### 🚀 Future Plans

- [ ] Custom field types
- [ ] Webhook support
- [ ] Content versioning

_Keep it simple. [Suggest features](https://github.com/snowztech/barecms/issues) that align with our minimal philosophy._

---

## 💬 Community

- **🐛 Report Issues**: [GitHub Issues](https://github.com/snowztech/barecms/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/snowztech/barecms/discussions)
- **🚀 Want to see a feature?**: [Open a issue](https://github.com/snowztech/barecms/issues)

## License

MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all [contributors](https://github.com/snowztech/barecms/graphs/contributors) who have helped build BareCMS
- Inspired by the need for a truly minimal, yet powerful CMS solution
- Built with ❤️ by the [SnowzTech](https://github.com/snowztech) team

---

<div align="center">

**[⭐ Star us on GitHub](https://github.com/snowztech/barecms) — it helps!**

Made with ❤️ by [SnowzTech](https://github.com/snowztech)

</div>
