## Description

Carpark Info Assignment

## Prerequisites
Before you begin, ensure you have the following requirements met:

- Node.js v18.15.x installed on your system.
- Understanding of Node.js, NestJS framework, and SQLite.

## Installation
- Please use node version <b>v18.15.0</b>

```bash
# If you have nvm
$ nvm use 

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Access OpenAPI Documentation
You can access the Swagger API documentation for this project by navigating to the following URL in your web browser:

http://localhost:3000/docs/carpark-info

This documentation provides details about the available endpoints, request parameters, request bodies, and response structures.


## Project Details

### NodeJS version
We are using Node.js version 18.15.0 for this project. If you haven't already installed it, you can download it from the official Node.js website: [NodeJS](https://nodejs.org/en/download) or use Node Version Manager(nvm)

### NestJS Framework
Our project is built using the NestJS framework. NestJS is a powerful, progressive JavaScript framework for building efficient, reliable, and scalable server-side applications.
- Official NestJS website: [NestJS](https://nestjs.com/)

### SQLite In-Memory Mode
We utilize SQLite in-memory mode as our database for this project. SQLite is a self-contained, serverless, and zero-configuration SQL database engine.
- In-Memory Databases: [SQLite In-Memory Database](https://www.sqlite.org/inmemorydb.html)

### Initialization of Database
When you start the application, the database will be initialized, all data in latest file will be import to database.

### Cron Task for Store Information into Database
This project includes a scheduled cron task that synchronizes data from a daily file to the SQLite database. The task runs automatically at 10 AM, fetching data from the daily file and updating the database.

### File Folder
The daily files that need to be synchronized are stored in the `file-import` folder within the project. File names should follow the format: `hdb-carpark-information-${timestamp}`.

## Project Structure
```bash
.
├── file-import
├── src
│   ├── constants
│   ├── guards
│   ├── interceptors
│   ├── middlewares
│   ├── models
│   ├── modules
│   │   ├── app
│   │   ├── carpark-info
│   │   ├── config
│   │   ├── cron-task
│   │   ├── database
│   │   ├── token
│   │   ├── user
│   │   └── wish-list
│   ├── pipes
│   └── share
└── test
```

## License

Nest is [MIT licensed](LICENSE).
