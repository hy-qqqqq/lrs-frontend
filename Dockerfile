FROM docker.io/library/node:21-alpine3.18

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
