# task-api
[![Generic badge](https://img.shields.io/badge/npm-v14.16.1-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/node-6.14.12-green.svg)](https://shields.io/)

Task API is a RESTful API that allows the user to add, view, update, and delete task

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [RESTful API Endpoints](#restful-api-endpoints)
* [Setup](#setup)

## General info
This app built with ExpressJS and MySQL.

### Features
* Middleware:
  - [x]  Helmet.js is used in this app, helmet adds several security headers to this app HTTP response.
  - [x]  body-parser is used in this app, its function is to parse the HTTP request body.
 
* Logging:
  - [x]  Morgan.js is used in this app, morgan generates HTTP request logs that include details such as the request method, URL, response status code, and response time.
  
* Unit Testing:
  - [x]  Mocha, chai, and supertest is used in this app, Chai is an assertion library that is mostly used alongside Mocha. SuperTest makes a request to host and endpoint, and saves the response in the response variable.

* Documentation:
  - [x]  Swagger is used in this app, swagger helps API documentation to be more readable and provides a web-based testing API tools.

## Technologies
Project is created with:
* node : 14.16.1
* express : 4.18.2
* sequelize : 6.28.1
* mysql2 : 3.1.2

## RESTful API Endpoints
### API Endpoints
RESTful API Endpoints are shown in the table below:
| Method | Endpoint | Description |
| --- | --- | --- | 
| POST | `/api/tasks` | Add new task | 
| GET | `/api/tasks` | View all task |
| GET | `/api/tasks/{id}`| View task by id |
| PATCH | `/api/tasks/{id}` | Update task by id |
| DELETE | `/api/tasks/{id}` | Delete task by id |


### Swagger 
Feel free to view REST API documentation, and do an API test with Swagger by entering this endpoint:
| Endpoint | Description |
| --- | --- | 
| `/api-docs` | View Documentation / Testing API | 

## Setup
To run this project, install it locally using npm:
```
$ cd task-api
$ npm install
```
please add .env in root folder before run the application, the suggested .env is bellow:
```
NODE_ENV = "development"
DB_USERNAME = "your_user_name"
DB_PASSWORD = "your_password"
DB_DBNAME = "your_db_name"
DB_HOST = 127.0.0.1
```
here is the code for the migration:
```
sequelize db:migrate
```
after that, you can run the app by entering code bellow:
```
$ npm start
```
In addition, if you want to do unit test, you can run the code bellow 

*make sure the application is not running while testing, if it is run the ports will overlap each other*
```
$ mocha
```
