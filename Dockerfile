# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend folder contents into the container
COPY backend/ ./backend

# Explicitly copy the .env file into the container's root directory
COPY .env ./.env

# Expose the application port
EXPOSE 5000

# Set environment variables (if necessary)
ENV NODE_ENV=development

# Start the backend server
CMD ["npm", "run", "start"]
