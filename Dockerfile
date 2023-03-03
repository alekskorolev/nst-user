FROM node:18.14.0

COPY dist /app/dist
COPY node_modules /app/node_modules

WORKDIR /app

CMD ["node", "./dist/main.js"]

