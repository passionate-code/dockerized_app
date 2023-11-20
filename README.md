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

File ./api/bin/www set the http server for Express JS app.
File ./api/app.js define router, view engine, error handler for Express JS app. It also executes cron-node to perform scheduled cron job to monitor websites.




### Demo ###

1. Go to url: http://rinalab.org/django/chatmind/
2. Enter a query inside the text box and hit submit to fetch real time chatbot response
3. User query and chatbot response will be displayed inside the right panel
4. The left panels will show details pulled from the database for top three products that matched user query
5. Refer Figure 1 for example demo





