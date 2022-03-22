FROM node:10

RUN mkdir -p Users/home/node/app/node_modules && chown -R node:node Users/home/node/app

WORKDIR /Users/home/node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3333

CMD [ "npm", "run", "dev" ]