FROM node:12
# создание директории приложения
WORKDIR .
# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./
RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --omit=dev
# копируем исходный код
COPY . .
EXPOSE 8080
CMD [ "node", "connect-two-peers/client.mjs" ]