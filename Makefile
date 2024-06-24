.PHONY: build run stop

start-app:
	cd front-end && npm start

build:
	cd back-end && docker-compose build

serve:
	cd back-end && docker-compose up

stop:
	cd back-end && docker-compose down
