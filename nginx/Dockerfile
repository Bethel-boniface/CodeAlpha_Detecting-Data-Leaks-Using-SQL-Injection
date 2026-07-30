# -----------------------------
# Stage 1 - Build React
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY ../frontend/package*.json ./

RUN npm ci

COPY ../frontend .

RUN npm run build

# -----------------------------
# Stage 2 - Nginx
# -----------------------------
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]