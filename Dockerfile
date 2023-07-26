# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all the source code to the container
COPY . .

# Expose the port that the application will listen on (make sure it matches the port used in your app)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]