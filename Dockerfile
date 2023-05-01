# Stage 1 - Build
FROM node:18.12.1-alpine3.17 AS frontend-build

WORKDIR /app
COPY . .
RUN npm i && npm run build

# Stage 2 - Run
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=frontend-build /app/dist/tay-training-frontend /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
