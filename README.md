<!-- omit in toc -->
# TwitClone 
by Max Hayes

**TwitClone** is a full-stack webapp which mimics the functionality of of the social media platform [Twitter](www.twitter.com). 

Contents:
- [About TwitClone](#about-twitclone)
  - [Details](#details)
  - [Features](#features)
  - [Navigating](#navigating)
- [Setting up](#setting-up)
- [Additional Notes](#additional-notes)


## About TwitClone

### Details
This project is built on a [MERN tech stack](#), meaning...
* Data and database entries are handled with **MongoDB**
* Backend API requests are handled **Express JS**
* Frontend displaying and UI handled with **React**
* Both frontend and backend services are ran on **Node.js**


### Features
* **Followers** with bi-directional relationships
* **Posting** (Tweeting) messages or media to public or private audiences
* **Tagging** posts with [#hashtags](#features)
* **Liking** and **replying** to posts and other replies
* Custom user profiles and global user lookup

Check out [this video](#) to see this project with a working userbase


### Navigating
.
|-- backend
|   |-- controllers
|   |-- middleware
|   |-- models
|   |-- routes
|   |-- index.js
|
|-- frontend
|   |-- src
|       |-- components
|       |-- pages
|       |-- state
|       |   |--index.js
|       |-- util.js
|       |-- App.js

Important files and directories
* `backend/models/` includes how User and Post database entries are modeled
* `backend/routes/` includes all possible API routes
* `backend/index.js` includes configurations for backend of the application

* `frontend/util.js` includes all handlers for requests between frontend and backend
* `frontend/state/index.js` includes all current states accessible across the applicaton
## Setting up

## Additional Notes