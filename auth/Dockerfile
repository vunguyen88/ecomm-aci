FROM node:alpine

WORKDIR /app
COPY package.json .
# RUN npm install --only=prod
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

