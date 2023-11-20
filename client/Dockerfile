FROM node:alpine

RUN addgroup mfrlab && adduser -S -G mfrlab reeki
RUN mkdir /client && chown reeki:mfrlab client
USER reeki

WORKDIR /client
COPY package.json .
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
COPY . .
EXPOSE 3000
CMD ["npm", "start"]