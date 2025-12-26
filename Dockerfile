# -------- Builder --------
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# -------- Runner --------
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Chỉ copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
