FROM node:16-alpine

WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Define the command to run your app
CMD ["node", "/usr/app/src/index.js"]