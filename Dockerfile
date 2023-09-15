FROM node:20 

WORKDIR /app

COPY package*.json ./

RUN npm install && \
	npm install -g typescript	

COPY . .

RUN tsc

ENV PORT=4001

EXPOSE 4001

CMD ["node", "built/app.js"]
