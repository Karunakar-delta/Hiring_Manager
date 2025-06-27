# Use an official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose app port (example: 3000)
EXPOSE 3002

# Command to run the app
CMD [ "node", "app.js" ]
