.PHONY: build-ui serve clean

UI_DIR := ui

build-ui:
	@echo "Building ui..."
	cd $(UI_DIR) && npm install && npm run build

serve: build-ui
	@echo "Starting Go server..."
	go run main.go
