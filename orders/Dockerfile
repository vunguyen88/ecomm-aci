FROM node:alpine

WORKDIR /app
COPY package.json .
# RUN npm install --only=prod
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 8002
CMD ["npm", "start"]