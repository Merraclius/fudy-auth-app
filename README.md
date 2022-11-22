<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

Test assignment with auth service with a couple of endpoints.
All endpoints with parameters can be found in Swagger 

## Installation

```bash
# docker
$ docker-compose up app_install
```

## Running the app

```bash
# docker
$ docker-compose up -d app db

# container logs in follow mode
$ docker-compose logs -f app

# swagger URL
http://127.0.0.1:3000/api
```

## Test
Go into a running container and execute these commands there
```bash
# docker (in the project dir)
$ docker-compose exec app bash

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
