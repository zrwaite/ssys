FROM node:14
WORKDIR /app
COPY ["./frontendServer/package.json", "./frontendServer/package-lock.json", "./"]
RUN npm install
COPY ["./frontend", "./client"]
COPY ["./frontendServer", "./server"]
WORKDIR /app/client
RUN npm install
RUN npm run build
WORKDIR /app
ENV PORT=80
EXPOSE 80
CMD ["npm", "start"]