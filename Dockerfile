# Use the official Node.js 22 image as the base for the build stage
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm
RUN npm install -g npm@11.0.0

# Install dependencies
RUN npm install --legacy-peer-deps

# Correctly copy the entire project
COPY . .

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "start"]