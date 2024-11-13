# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the built application
FROM nginx:alpine

# Copy the built application from the previous stage to the Nginx web server's root directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]