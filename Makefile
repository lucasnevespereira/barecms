.PHONY: build-ui serve clean

UI_DIR := ui

build-ui:
	@echo "Building ui..."
	cd $(UI_DIR) && npm install && npm run build

run-ui:
	@echo "Running ui..."
	cd $(UI_DIR) && npm run dev

serve: build-ui
	@echo "Starting Go server..."
	go run main.go

dev: run-ui
	@echo "Running Go Server..."
	go run main.go -dev
