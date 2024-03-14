# Use the base image with the desired runtime
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD ["npm", "start"]