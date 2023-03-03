FROM node:18.9.0
ARG ENV

WORKDIR /app

RUN npm install -g npm@8.19.1 \
    npm install -g http-server

COPY . .

RUN npm install
RUN npm run test:unit
RUN npm run test:pact
RUN npm run build-$ENV

EXPOSE 8080
CMD ["http-server", "dist"]