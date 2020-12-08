FROM node:13.12.0-alpine
WORKDIR /app/frontend
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add react-scripts@3.4.1
COPY . ./
EXPOSE 3000
