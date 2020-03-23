# BASE
FROM node:13.10.1-alpine as base

MAINTAINER AHDesigns

ENV APP_HOME=/app
ENV PORT=4000

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY package.json $APP_HOME
COPY yarn.lock $APP_HOME

RUN yarn install --only=production
RUN cp -R node_modules prod_modules
RUN yarn install

# BUILD
FROM base as build
WORKDIR $APP_HOME

COPY . .

# just to see build working
RUN ls ./src

# PROD
FROM node:8.11.1-alpine

COPY --from=base /app/prod_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["node", "dist/app.js"]
