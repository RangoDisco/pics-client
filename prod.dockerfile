FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN yarn

COPY .env ./
COPY ts.config.json ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY src src
COPY public public

CMD yarn build && yarn start