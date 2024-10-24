FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# install dependencies
RUN npm ci

COPY . . 

RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# expose port 80 to the outside
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]