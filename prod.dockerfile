FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY ./ ./

RUN yarn run build

EXPOSE 3000

USER node

CMD ["yarn", "start"]