FROM node:18-alpine as build

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm

RUN pnpm install

COPY .env* ./

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN echo 'server { \
    listen 4004; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 4004

CMD ["nginx", "-g", "daemon off;"]