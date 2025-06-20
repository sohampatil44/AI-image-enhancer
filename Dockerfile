FROM node:18-alpine AS builder



WORKDIR /app


COPY package*.json ./
COPY vite.config.js ./
COPY . .

RUN npm install && npm run build

FROM nginx:alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# ✅ Fix permission to nginx cache directory
RUN mkdir -p /var/cache/nginx/client_temp \
    && chown -R appuser:appgroup /var/cache/nginx

RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R appuser:appgroup /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

#USER appuser

EXPOSE 80   

CMD ["nginx","-g","daemon off;"]
