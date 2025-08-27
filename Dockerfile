FROM node:18-alpine AS builder

# Install dependencies
WORKDIR /app
COPY package.json .
COPY package-lock.json* .
COPY .npmrc .
RUN npm install

# Copy all files and build
COPY . .
RUN npm install react-scripts -g
RUN npm run build

# Serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
