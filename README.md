## TASK TRACKER

TaskTrackers is a web application that helps you stay on top of your responsibilities. This application enables you to organize and manage your tasks/activities. This permits you to progress and create progress in a productive manner.

# Team Details:

gupta.ayus@northeastern.edu|001554875
nemade.p@northeastern.edu|002139730
patil.janh@northeastern.edu|001523317
popat.v@northeastern.edu|002135187

## How to Run?

1. cd ./client
2. npm run start

## Features

Following are the features that TaskTrackers provides:

- Allows you to create a tasks
- Modify the existing tasks
- Persists the data forever of the tasks
- See the overall statistics of workload
- You can block your Google Calendar for the crucial tasks

## Tech

TaskTracker uses a number of open source projects to work properly:

- [React JS] - HTML enhanced for web apps!
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDB] - a database to store the data
- [HTML] - a markup language
- [SASS] - styling language to style web app
- [Firebase] - to store the files and images

# TASK TRACKER api

Stack used:

1. `expressjs`
2. `mongoosejs`

To start the project:

1. cd ..
2. cd ./server
3. npm i
4. npm run start

APIs available in the service.

Auth APIs

```
// Register a User
POST /auth/register

// Login a user
POST /auth/login

// Login via SSO - Google
POST /auth/google

// to verify account
GET /users/verify-account/:confirmationCode

// to update password
PUT /users/update-password/:id
```

Users APIs - Authentication Required

```
// Get details of the logged in user
GET /users/me

// To update the logged in user
PUT /users/me

// To delete the logged in user
DELETE /users/me

// fetch all the team members of the logged in user
GET /users/members
```

Project APIs - Authentication Required

```
// Get all the projects related to logged in user
GET /project/all

// To create a project
POST /project/create

// To fetch a specific project
GET /project/all/:id

// To update a specific project
PUT /project/all/:id

// To delete a specific project
DELETE /project/all/:id
```

Tasks APIs - Authentication Required

```
// Get all the tasks related to a specific project
POST /task

// To fetch all the tasks
POST /task/all

// To fetch logs of a logged in user
GET /task/logs

// To fetch all the tasks of a project
POST /task/all

// To fetch all the columns present in a project
POST /task/column

// to get a specific task
GET /task/all/:id

// to update a specific task
PUT /task/all/:id

// to delete a specific task
DELETE /task/all/:id
```
