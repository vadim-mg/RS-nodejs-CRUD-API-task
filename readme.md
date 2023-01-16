# CRUD-API

Simple CRUD API using in-memory database underneath

deadline: 2023-01-17
Self-Score: 190
---
- [task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
- [scoring](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)
---
## Install

1. git clone git@github.com:vadim-mg/RS-nodejs-CRUD-API-task.git
2. npm install
3. You need copy .env.example to .env and configure your settings.

---
## Run app
Start application in development mode with nodemon:
```
npm run start:dev
```
Start the build process and then runs the bundled file:
```
npm run start:prod
```
Starts multiple instances of application using the Node.js Cluster API (equal to the number of logical processor cores on the host machine, each listening on port PORT + n) with a load balancer that distributes requests across them (using Round-robin algorithm):
```
npm run start:multi
```

---
## Implementation details adn usage

1. Implemented endpoint `api/users`:
    - **GET** `api/users` get all persons
        - return `status code` **200** and all users records
    - **GET** `api/users/{userId}` 
        - return `status code` **200** and and record with `id === userId` if it exists
        - return `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - return `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` create record about new user and store it in database
        - return `status code` **201** and newly created record
        - return `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` update existing user
        - return` status code` **200** and updated record
        - return` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - return` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` delete existing user from database
        - return `status code` **204** if the record is found and deleted
        - return `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - return `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

---
### Run tests
Start all test:
```
npm run test
```
Start tests only for api module with --watch:
```
npm run test:api
```
Start all tests with --watch:
```
npm run test:watch
```
Start all tests with --coverage:
```
npm run test:coverage
```


---