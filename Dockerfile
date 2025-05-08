FROM node:18-alpine as build

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 4004

CMD ["nginx", "-g", "daemon off;"]