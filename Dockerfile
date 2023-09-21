# BUILD
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY tsconfig.json ./
COPY . .
RUN tsc


# RUN
FROM node:20
WORKDIR /app
COPY --from=build /app/lib/built /app/lib/built
COPY package*.json ./
RUN npm install --only=production
ENV PORT=4001
EXPOSE 4001
CMD ["node", "lib/built/app.js"]
