include ./back-end/.env.sample
export $(shell sed 's/=.*//' ./back-end/.env.sample)

.PHONY: build run stop migrate-create migrate-up migrate-down migrate-version

node:
	cd front-end && npm i 

start-app:
	cd front-end && npm start

start-server:
	cd back-end && docker compose build && docker compose up

stop-server:
	cd back-end && docker compose down

migrate-create:
	@migrate create -dir ./back-end/migration-data -ext sql $(name)

migrate-up:
	@migrate -path=./back-end/migration-data -database postgres://$$DATABASE_USER:$$DATABASE_PASSWORD@localhost:$$DATABASE_PORT/$$DATABASE_NAME?sslmode=disable up $(count)

migrate-down:
	@migrate -path=./back-end/migration-data -database postgres://$$DATABASE_USER:$$DATABASE_PASSWORD@localhost:$$DATABASE_PORT/$$DATABASE_NAME?sslmode=disable down $(count)

migrate-version:
	@migrate -path=./back-end/migration-data -database postgres://$$DATABASE_USER:$$DATABASE_PASSWORD@localhost:$$DATABASE_PORT/$$DATABASE_NAME?sslmode=disable version

