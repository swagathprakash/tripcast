.PHONY: build run stop

build:
	cd back-end && docker-compose build

serve:
	cd back-end && docker-compose up

stop:
	cd back-end && docker-compose down
