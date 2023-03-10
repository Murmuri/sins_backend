lines?=1000
stage?=dev

compose=sudo docker-compose -f docker-compose-prod.yml
compose_dev=sudo docker-compose -f docker-compose-dev.yml

build:
	$(compose) up --build -d

stop:
	$(compose) stop

restart:
	$(compose) stop
	$(compose) up -d

logs:
	$(compose) logs -f --tail=$(lines)

down:
	$(compose) down

destroy:
	$(compose) down -v


build-dev:
	$(compose_dev) up --build -d

stop-dev:
	$(compose_dev) stop

restart-dev:
	$(compose_dev) stop
	$(compose_dev) up -d

logs-dev:
	$(compose_dev) logs -f --tail=$(lines)

down-dev:
	$(compose_dev) down

destroy-dev:
	$(compose_dev) down -v
