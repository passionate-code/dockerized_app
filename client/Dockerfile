# Download lightweight Linux OS alpine
FROM node:alpine

# add group mfrlab and add user reeki and run as user reeki instead of root
RUN addgroup mfrlab && adduser -S -G mfrlab reeki
RUN mkdir /client && chown reeki:mfrlab client
USER reeki

# Set the work directory to app folder. 
# We will be copying our code here
WORKDIR /client

#Copy package.json file to the client folder inside container
COPY package.json .

# Install the dependencies in the container
RUN npm install

# Give permission to node_modules/.cache
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Copy the rest of the code in the container
COPY . .

# Expose the service over PORT 3000
EXPOSE 3000

# Run the react app
CMD ["npm", "start"]