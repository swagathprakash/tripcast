.PHONY: build run stop

node:
	cd front-end && npm i 

start-app:
	cd front-end && npm start

build:
	cd back-end && docker compose build

serve:
	cd back-end && docker compose up -d

stop:
	cd back-end && docker compose down
