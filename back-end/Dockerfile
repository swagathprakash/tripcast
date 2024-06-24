FROM golang:1.18-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o tripcast

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/.env.sample .
COPY --from=builder /app/tripcast .
EXPOSE 4003
CMD ["./tripcast"]
