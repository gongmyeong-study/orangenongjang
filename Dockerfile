FROM node:13.12.0-alpine as builder
WORKDIR /app
COPY orange/package.json orange/yarn.lock ./
RUN yarn install
COPY orange .
RUN yarn build --prod

FROM nginx:1.19.0
COPY --from=builder /app/build /var/www/frontend
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx-app.conf /etc/nginx/conf.d/default.conf
COPY nongjang/uwsgi_params /etc/nginx/uwsgi_params
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
