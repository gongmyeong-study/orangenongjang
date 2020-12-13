FROM node:13.12.0-alpine
WORKDIR /app/frontend
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build --prod
