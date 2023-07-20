FROM node:alpine as build-react-stage
WORKDIR /app
COPY . /app
# ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build-react-stage /app/build /usr/share/nginx/html
