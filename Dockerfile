FROM node:10.16.0

EXPOSE 3001
COPY ["./package.json", "./package-lock.json", ".eslintrc.js", ".eslintignore", "/app/"]
WORKDIR /app
RUN npm i --quiet
ENV NODE_ENV=production
COPY ./src /app/src

CMD npm start
