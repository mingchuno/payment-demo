# HK01 offsite backend test

## devops

To start the mongodb and redis for development, install `docker-compose` backend `docker-compose up -d` at `./devops`

## backend

`backend` is the API backend using:

- express as the API framework
- mongodb as database
- redis as cache
- flow for type check (TODO)
- eslint for lint
- jest as test & mock framework (TODO)

### Get start

```
yarn install
yarn start
```

## frontend

`frontend` is the SPA frontend using:

- vue.js as the frontend framework
- element-ui as the UI framework
- eslint for lint

### Get start

```
yarn install
yarn dev
```

## TODOs

- client form validation
- better server side validation
- flow in server side (do we need Webpack and Babel?)
- backend test using jest
- frontend test?
- backend use `import` instead of `require()`? (Need Babel)
- server graceful teardown
