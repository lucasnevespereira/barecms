.PHONY: all help ui up clean logs

UI_DIR := ui

all: help

help:
	@echo "BareCMS Development Commands"
	@echo ""
	@echo "  up       - Start the development environment"
	@echo "  ui       - Build UI (frontend)"
	@echo "  clean    - Stop and cleanup containers"
	@echo "  logs     - Show container logs"
	@echo "  help     - Show this help message"
	@echo ""

ui:
	cd $(UI_DIR) && npm install && npm run build

up:
	docker compose up

clean:
	docker compose down -v

logs:
	docker compose logs -f