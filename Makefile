compose=sudo docker-compose -f docker-compose.yml

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