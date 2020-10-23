FROM node:14.14-alpine
WORKDIR /app
COPY ["./package*.json", "./"]
RUN npm install --silent
COPY . .
CMD npm run start
