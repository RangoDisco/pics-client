FROM node:lts-alpine
WORKDIR /app

EXPOSE 3000

COPY src src
COPY public public
COPY .env ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY package.json ./
RUN yarn

CMD yarn dev