.PHONY: build run stop

start-app:
	cd front-end && npm start

build:
	cd backend && docker-compose build

serve:
	cd backend && docker-compose up

stop:
	cd backend && docker-compose down
