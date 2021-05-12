FROM node:14
WORKDIR /usr/src/tutorial
COPY . .
RUN ls
COPY package*.json ./
RUN npm install
EXPOSE 5000
CMD ["node","index.js"]