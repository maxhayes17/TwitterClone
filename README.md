<!-- omit in toc -->
# TwitClone 
*by Max Hayes*

**TwitClone** is a full-stack webapp which mimics the functionality of of the social media platform [Twitter](www.twitter.com). 

Contents:
- [About TwitClone](#about-twitclone)
  - [Details](#details)
  - [Features](#features)
  - [Navigating](#navigating)
- [Setting up locally](#setting-up-locally)
- [Images](#images)


## About TwitClone

### Details
This project is built on a MERN tech stack, meaning...
* Data and database entries are handled with **MongoDB**
* Backend API requests are handled with **Express JS**
* Frontend displaying and UI handled with **React**
* Both frontend and backend services are ran on **Node.js**

Along with this, styling was done with **TailwindCSS**

### Features
When making this project, I wanted to focus on just the core features of Twitter. These include:

* Customizable user profiles
* Followers with bi-directional relationships
* Text or media (image/video) posts which can be liked or replied to by other users
* Tagging posts with [#hashtags](#features)
* Searching for other profiles or hashtags

### Navigating
Important files and directories
* `backend/models/` includes how User and Post database entries are modeled
* `backend/routes/` includes all possible API routes
* `backend/index.js` includes configurations for backend of the application and setup for file upload/storage
  * `backend/public/uploads` will contain files uploaded locally by users

* `frontend/src/state/index.js` includes all current states accessible across the applicaton
* `frontend/src/pages` includes all the different pages used throughout the app 

## Setting up locally
1. Configure the following environment variables in `backend/.env`
   * `MONGO_URL` - A [connection string](https://www.mongodb.com/basics/mongodb-connection-string) for MongoDB database
   * `PORT` - The port for the backend server to run on
   * `JWT_SECRET` - A **Secret** key for JSON Web Token authentication

2. Install required packages in *both* frontend and backend directories
```bash
# Starting from root directory...
cd frontend/
npm install

cd ../backend/
npm install
```
3. After doing so, you are ready to start running the app
```bash
# Run to start up the backend
cd backend
node index.js
```
* This server will be run on the port indicated in `backend/.env`. After starting up, the port on which ther server is hosted will be displayed
```bash
# Run to start up the frontend
cd frontend
npm start
```
* Upon running, the website can be viewed on http://localhost:3000


## Images