# Use an official Node.js runtime as a parent image
FROM node:14 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install && npm install typescript -g

# Copy the rest of your application code
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image to serve the build
FROM nginx:alpine

RUN rm /usr/share/nginx/html/*.html

# Copy the React build from the previous step
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80