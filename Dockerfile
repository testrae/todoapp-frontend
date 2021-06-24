# stage 1
FROM circleci/node:12.14-browsers AS frontend
WORKDIR /app
COPY . .
RUN sudo chmod -R 777 /app
RUN  npm ci && npm run build
# stage 2
FROM nginx:alpine
COPY --from=frontend /app/dist/todo-frontend /usr/share/nginx/html

EXPOSE 80

