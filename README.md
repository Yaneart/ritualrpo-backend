# RitualRPO Backend

Backend обслуживает сайт и панель администратора. Он хранит в PostgreSQL услуги, товары, заявки, отзывы, FAQ, настройки сайта и данные калькулятора, а затем отдаёт их через REST API.

Сделан на NestJS, Prisma и TypeScript. При запуске через Docker миграции базы применяются автоматически.

## Запуск

В корне проекта:

```powershell
docker compose up -d
```

API будет доступен по адресу http://localhost:4000/api.

Для локальной разработки:

```powershell
yarn install
yarn start:dev
```

Заполнить базу тестовыми данными:

```powershell
yarn seed
```
