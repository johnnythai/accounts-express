# BUILD
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
RUN tsc


# RUN
FROM node:20
WORKDIR /app
COPY --from=build /app/built /app/built
COPY package*json ./
RUN npm install --only=production
ENV PORT=4001
EXPOSE 4001
CMD ["node", "built/app.js"]
