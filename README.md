# Web Application using MERN Stack

<!-- ***Install mongodb***

To run this app:
### Run `cd backend`
### Run `npm install`
### Run `cd frontend`
### Run `npm install`
### Run `node ../backend/server`
### Run `npm start` -->



## Getting Started
To get you started you can simply clone the repository:

```
git clone https://github.com/Vanine/maps.git
```
and install the dependencies 
install node.js dependencies
```
cd backend
npm install
```


### Prerequisites
You need git to clone the repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

A number of node.js tools is necessary to initialize and test the project. You must have node.js and its package manager (npm) installed. You can get them from  [http://nodejs.org/](http://nodejs.org/). The tools/modules used in this project are listed in package.json and include express, mongodb, mongoose.

#### MongoDB
The project uses MongoDB as a database. If you are on Mac and using Homebrew package manager the installation is as simple as `brew install mongodb`.


### Start the MongoDB server
First we need to create the `db` directory where the database files will live in. In your terminal navigate to the `root` of your system by doing `cd ..` until you reach the top directory. You can create the directory by running `sudo mkdir -p /data/db`. Now open a different tab in your terminal and run `mongod` to start the Mongo server.



Importing Data Locally
======================
The mongorestore program loads data from either a binary database dump created by mongodump or the standard input (starting in version 3.0.0) into a mongod or mongos instance.
These instructions will help you load the datasets into a local MongoDB instance (e.g., MongoDB running on your laptop).

1. Ensure you have a running MongoDB instance. For instructions on installation and setup, see the `MongoDB installation documentation <https://docs.mongodb.com/manual/installation/>`_. Installation tutorials for all platforms include instructions for running MongoDB (the mongod daemon).

2. Once you have a ``mongod`` instance running, you may import the datasets using `mongorestore <https://docs.mongodb.com/manual/reference/program/mongorestore/>`_.

   a. Open a command shell (e.g., bash, powershell, or cmd).
   b. Assuming you are running ``mongod`` on the default port, you may import the datasets from the dump directory by simply running, ``mongorestore``. ``mongorestore`` looks for a directory called ``dump`` to import.

### Run the Application

The project is preconfigured with a simple development web server. The simplest way to start this server is:
```
    `cd backend`
    `node server`
```
### Project Structure

*Under Construction*