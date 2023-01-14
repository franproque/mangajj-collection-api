FROM node:16-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

EXPOSE 8080
#CMD [ "npx","ts-node-dev","src/index.ts" ]
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
USER node

ENTRYPOINT [ "/entrypoint.sh" ]
#CMD /bin/sh
#CMD ls