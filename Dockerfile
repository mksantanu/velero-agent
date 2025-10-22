FROM node:22-slim

WORKDIR /app

COPY dist/apps/velero-agent .

RUN npm ci

RUN chown -R node:node .
USER node

ENV NODE_ENV production
ENV LOG_LEVEL info
ENV DEFAULT_TIMEZONE UTC
ENV BASIC_AUTH_USERNAME psetadmin
ENV BASIC_AUTH_PASSWORD veler0u3y3ep04p5et
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000
ENV VELERO_NAMESPACE velero
ENV AUTH_SECRET_PASSPHRASE "san-key-for-pset"
ENV CACHE_DEFAULT_TTL 360000

ENV BASIC_AUTH_ENABLED=true

EXPOSE 3000

CMD ["node", "main.js"]

# docker build -t velero-agent .
