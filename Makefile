run-dev:
	docker-compose --env-file ./.env.development up -d
run-test:
	docker-compose --env-file ./.env.test up -d
run-prod:
	docker-compose --env-file ./.env.production up -d

build-dev:
	docker-compose --env-file ./.env.development up --build -d
build-test:
	docker-compose --env-file ./.env.test up --build -d
build-prod:
	docker-compose --env-file ./.env.production up --build -d

test-unit:
	npm run test:unit
test-e2e:
	docker build --rm -f Dockerfile.e2e-test -t cypress .
test-pact:
	npm run test:pact