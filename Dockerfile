# Frontend build stage
FROM node:18-alpine AS frontend
WORKDIR /app
COPY ui/ .
RUN npm install
RUN npm run build

# Backend build stage
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY . .
COPY .env.example .env
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o barecms ./cmd/main.go

# Final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app

# Copy built frontend
COPY --from=frontend /app/dist ./ui/dist

# Copy built backend
COPY --from=builder /app/barecms .

EXPOSE 8080

CMD ["./barecms"]