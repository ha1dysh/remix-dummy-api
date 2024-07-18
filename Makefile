check:
	docker compose config
up: check
	docker compose up -d
down:
	docker compose down
ps:
	docker compose ps -a
run:
	docker compose stop remix
	docker compose run --rm -v ./src:/app -p 5173:5173 remix bash
	docker compose start remix
