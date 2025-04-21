# Use the latest Node.js image
FROM node:latest  

# Set the working directory inside the container
WORKDIR /home/app  

# Copy package.json and package-lock.json first for caching
COPY package*.json ./  

# Install dependencies
RUN npm install  

# Reinstall bcrypt to match the container's architecture
RUN npm rebuild bcrypt --build-from-source  

# Copy the rest of the project files
COPY . .  

# Expose the application's port (change if needed)
EXPOSE 8001  

# Start the application
CMD ["node", "index.js"]
