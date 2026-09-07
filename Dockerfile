# syntax=docker/dockerfile:1
# arch-proof ölçümü için: Pages Router portföyünü standalone olarak paketler.
# -k3s (App Router) ile aynı Node sürümü + tek süreç (WC=1 eşdeğeri).

FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN bun install

FROM node:26-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* build'de bundle'a gömülür (getServerSideProps CMS'e bununla gider)
ARG NEXT_PUBLIC_API=https://api.huseyindol.com/api/v1/public
ARG NEXT_PUBLIC_DEFAULT_TENANT=tenant1
ARG NEXT_PUBLIC_HOST=http://portfolio.localhost:8088
ENV NEXT_PUBLIC_API=$NEXT_PUBLIC_API
ENV NEXT_PUBLIC_DEFAULT_TENANT=$NEXT_PUBLIC_DEFAULT_TENANT
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:26-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
