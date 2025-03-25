FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# Expose the port your app runs on
EXPOSE 3000
 
CMD ["npm", "start"]
