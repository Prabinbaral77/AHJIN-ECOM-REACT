FROM node:16-alpine

WORKDIR /app

# copy these files into the app folder
COPY package.json yarn.lock ./
RUN yarn install

# all the configuration we need to start
# COPY next.config.js ./next.config.js


COPY  tailwind.config.js ./

CMD ["yarn", "start"]
