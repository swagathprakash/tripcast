FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -o tripcast

FROM alpine:latest
RUN apk --no-cache add tzdata
WORKDIR /root/
COPY --from=builder /app/.env.sample .
COPY --from=builder /app/tripcast .
CMD ["./tripcast"]
