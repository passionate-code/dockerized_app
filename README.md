# General overview #

The web application that periodically make a request to websites to check for its activity has been developed. The application was containerized using Docker techonology to ensure portability. The back-end of the application was developed using Node JS that links to MongoDB that stored documents that contain data associated with the websites that were monitored. Cron job was used to periodically checked those websites activity and the data from retrieved responses were stored as documents in MongoDB. The front-end of the application was developed using React JS that periodically makes an API call to the back-end to receive updated data regarding the websites that were being monitored.

Note: Commands to execute in CLI of Cent OS. For other operating systems, there are equivalent commands to execute.

# Set up Docker #

sudo yum check-update # update yum

curl -fsSL https://get.docker.com/ | sh # download docker

sudo systemctl start docker # start docker

sudo systemctl enable docker # enable docker

# Run Docker composer #

docker compose up --build -d   # start all services as defined in docker-compose.yml configuration file

# Services in docker-compose.yml #

1) backend_expressjs
The back-end service (Node JS) will be build using configuration in ./api/Dockerfile and docker-compose.yml. The service can be accessed using this link after it is started: http://localhost:9000

2) frontend_reactjs
The front-end service (React JS) will be build using configuration in ./client/Dockerfile and docker-compose.yml. The service can be accessed using this link after it is started: http://localhost:3000

3) mongo
The database service (MongoDB) will be build using configuration in Dockerfile and docker-compose.yml.

4) mongo-express
The UI for mongoDB will be build using configuration in docker-compose.yml. The service can be accessed using this link after it is started: http://localhost:8081

# Initialised MongoDB #

The mongo-init.js was used to initialise a database called mindswiss and create collection called sites in that db. The sites collection is then prepopulated with documents that contain data about websites that will be monitored such as name, url, date updated and status code attributes.

# Express JS #

The following explain the roles of the following files in the application:

## ./api/bin/www ##

1) Set the http server for Express JS app.

## ./api/app.js ##

1) Define router, view engine, error handler for Express JS app.
2) It also executes cron-node to perform scheduled cron job to monitor websites and saved the result to MongoDB database.

## ./api/create_mongo_db.js ##

1) It utilises moongose module to make connection to MongoDB database mindswiss
2) Define the schema for Sites model/collection inside mindswiss database

## ./api/check_sites.js ##

1) It utilises moongose module and define asynchronous function to get url of websites to monitor from MongoDB
2) It utilises axios module and define asynchronous function to make a request and check the websites responses to monitor its activity

## ./api/cron_task.js ##

1) It utilises moongose module and define asynchronous function to update the documents inside sites collection of MongoDB with status code of monitored websites
2) It utilises node-cron module and define a function to perform scheduled task to get realtime status of monitored websites and update the MongoDB database with the retrieved data

## ./api/package.json ##

1) Define script to run for npm start command
2) List out dependecies for Node JS application

## ./views ##

1) Stored templates for Jade template engine. However, it is unused in this application as its using React JS to render the front-end page and backend is there to serve the api call from the front-end


# To generate client directory #

yum install nodejs # install node

yum install npm # install npm

npx create-react-app client # generate react app

# React JS #

The following explain the roles of the following files in the application:

## ./client/package.json ##

1) Define script to run for npm start command
2) List out dependecies for React JS application
3) Copy this file to client directory

## ./client/src/App.js ##

1) It utilises React functional component and axios to make an API call to the Node JS backend. The data retrieved will be rendered by the React functional component
2) The setInterval method is used to periodically make an API call to the backend for every minute so that updated data regarding the monitored websites inside MongoDB could retrieved and displayed by React JS
3) Please change the ip address of the url variable (line 7 of App.js) to the host ip address that run the application
4) Copy src directory to client directory

## ./client/Docker ##

1) Contain configuration to build the services inside Docker container
2) Copy this file to client directory






