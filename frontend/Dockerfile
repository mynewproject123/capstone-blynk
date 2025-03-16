# Step 1: Use Node.js as the base image for building the application
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available) to install dependencies first
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install

# Step 5: Copy all other files to the container (including source code)
COPY . .

# Step 6: Set the environment variable for Vite
ARG VITE_PORT=5173
ENV VITE_PORT=${VITE_PORT}

# Step 7: Build the React app for production using Vite
RUN npm run build && ls -la /app/dist

# Step 8: Use a lightweight web server (nginx) to serve the static build files
FROM nginx:alpine

# Step 9: Copy the custom Nginx configuration to set the correct port
COPY nginx.conf /etc/nginx/nginx.conf

# Step 10: Copy the build output from the previous step to the nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Step 11: Expose the correct frontend port (5173)
EXPOSE 5173

# Step 12: Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

