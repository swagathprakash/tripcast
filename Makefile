.PHONY: build run stop

build:
	cd backend && docker-compose build

serve:
	cd backend && docker-compose up

stop:
	cd backend && docker-compose down
