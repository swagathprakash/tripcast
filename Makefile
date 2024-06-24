.PHONY: build run stop migrate-create migrate-up migrate-down migrate-version

node:
	cd front-end && npm i 

start-app:
	cd front-end && npm start

build:
	cd back-end && docker compose build

serve:
	cd back-end && docker compose up

stop:
	cd back-end && docker compose down

migrate-create:
	@migrate create -dir ./back-end/migration-data -ext sql $(name)

migrate-up:
	@migrate -path=./back-end/migration-data -database postgres://tripcast:tripcast@localhost:5432/tripcast?sslmode=disable up $(count)

migrate-down:
	@migrate -path=./back-end/migration-data -database postgres://tripcast:tripcast@localhost:5432/tripcast?sslmode=disable down $(count)

migrate-version:
	@migrate -path=./back-end/migration-data -database postgres://tripcast:tripcast@localhost:5432/tripcast?sslmode=disable version

