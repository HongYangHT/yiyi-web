FROM node:alpine as builder
WORKDIR /app
COPY . .
RUN npm i && npm run build:prod

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx
RUN rm -rf ./*
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
