# Build prod dependencies and run server
FROM node:16.5.0-alpine
RUN apk --no-cache add git

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .

CMD npm run start:prod
