# Conteneur de dev
FROM node:14 as runner
ENV NODE_ENV=development

WORKDIR /app
COPY ./ /app

EXPOSE 3630
CMD ["npm", "run", "dev"]

# Conteneur de prod
FROM runner as builder
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

CMD ["npm", "start"]