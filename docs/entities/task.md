# Task

## Опис

Сутність завдання в системі.

---

## 1. Task Request DTO

### Опис
`Task Request DTO` — це дані, які фронтенд передає на бекенд під час створення або оновлення таски.

### Основні правила
- містить тільки ті поля, які дозволено передавати з фронтенду
- не містить внутрішніх службових полів БД
- може містити поля, які не зберігаються в БД напряму, але потрібні для бізнес-логіки

### Поля

| Поле           | Тип                                            | Обов'язковість | Опис                                         | Примітка                                  | Зберігається в БД |
| -------------- | ---------------------------------------------- | -------------- | -------------------------------------------- | ----------------------------------------- | ----------------: |
| title          | string                                         | так            | Назва                                        |                                           |                 ✅ |
| isOrganization | boolean                                        | так            | Ознака, що таска створюється від організації | використовується в логіці бекенду         |                 ❌ |
| organizationId | string                                         | умовно         | ID організації                               | обов'язкове, якщо `isOrganization = true` |                 ❌ |
| description    | string                                         | ні             | Опис                                         |                                           |                 ✅ |
| picture        | string                                         | ні             | URL зображення                               |                                           |                 ✅ |
| startDate      | string \| DateTime                             | так            | Дата початку                                 |                                           |                 ✅ |
| startTime      | string \| DateTime                             | так            | Час початку                                  |                                           |                 ✅ |
| endDate        | string \| DateTime                             | ні             | Дата завершення                              |                                           |                 ✅ |
| location       | `{ lat: number; lng: number }`                 | ні             | Координати                                   | у БД зберігається як `geography`          |                 ✅ |
| locationName   | string                                         | ні             | Назва локації                                |                                           |                 ✅ |
| amount         | number                                         | ні             | Необхідна сума                               |                                           |                 ✅ |
| currency       | string                                         | ні             | Валюта                                       |                                           |                 ✅ |
| requirements   | string                                         | ні             | Вимоги                                       |                                           |                 ✅ |
| categories     | [CategoryType](/constants/task#categorytype)[] | так            | Категорії                                    | формат зберігання треба уточнювати окремо |                 ✅ |

### Умовні правила
- `organizationId` є обов'язковим, якщо `isOrganization = true`
- `isOrganization` не зберігається в БД, а використовується для визначення хоста таски

### Приклад

```json
{
  "title": "TASK",
  "description": "Description of task",
  "startDate": "2026-03-30",
  "startTime": "2026-03-30T02:25:00.000Z",
  "endDate": "2026-04-01",
  "categories": ["NATURE"],
  "isOrganization": false,
  "organizationId": null,
  "location": {
    "lat": 48.123,
    "lng": 10.456
  },
  "locationName": "Memmingen",
  "amount": 100,
  "currency": "EUR",
  "requirements": "Bring gloves"
}
```

---

## 2. Task DB Model

### Опис
`Task DB Model` — це структура даних, яка реально зберігається в базі даних.

### Основні правила
- містить внутрішні поля системи
- може включати foreign keys
- може відрізнятися від request і response формату
- relation-об'єкти тут зазвичай не зберігаються як вкладені JSON-об'єкти, а представлені через зв'язки та ключі

### Поля

| Поле          | Тип                                            | Nullable | Опис                 | Примітка                        |
| ------------- | ---------------------------------------------- | -------: | -------------------- | ------------------------------- |
| id            | string                                         |       ні | Унікальний ID        | генерується в БД                |
| title         | string                                         |       ні | Назва                |                                 |
| description   | string                                         |      так | Опис                 |                                 |
| picture       | string                                         |      так | URL зображення       |                                 |
| status        | [TaskStatus](/constants/task#taskstatus)       |       ні | Статус               | за замовченням `PENDING`        |
| hostId        | number                                         |       ні | FK на таблицю `Host` | визначається бекендом           |
| startDate     | DateTime                                       |       ні | Дата початку         |                                 |
| startTime     | DateTime                                       |       ні | Час початку          |                                 |
| endDate       | DateTime                                       |      так | Дата завершення      |                                 |
| locationId    | number                                         |      так | ID локації           | може генеруватися БД / бекендом |
| location      | geography                                      |      так | Координати           | PostGIS / geography             |
| locationName  | string                                         |      так | Назва локації        |                                 |
| amount        | number                                         |      так | Необхідна сума       |                                 |
| currentAmount | number                                         |      так | Поточна зібрана сума |                                 |
| currency      | string                                         |      так | Валюта               |                                 |
| requirements  | string                                         |      так | Вимоги               |                                 |
| categories    | [CategoryType](/constants/task#categorytype)[] |   ні/так | Категорії            | залежить від реальної схеми     |
| createdAt     | DateTime                                       |       ні | Дата створення       | генерується в БД                |
| updatedAt     | DateTime                                       |       ні | Дата оновлення       | генерується в БД                |

### Що НЕ входить напряму в DB Model
- `isOrganization`
- `organizationId` як request-поле
- `host` як вкладений об'єкт
- `joinedUsers` як готовий response-масив

### Схема SQL / ER

<!-- ![Task diagram](/diagrams/task.svg) -->
<img src="/diagrams/task.svg" class="diagram" />


## 3. Task Response DTO

### Опис
`Task Response DTO` — це об'єкт, який бекенд повертає на фронтенд.

### Основні правила
- містить тільки ті поля, які потрібні клієнту
- може включати вкладені relation-об'єкти
- може відрізнятися від внутрішньої структури БД

### Поля

| Поле          | Тип                                                          | Обов'язковість | Опис                         | Примітка                   |
| ------------- | ------------------------------------------------------------ | -------------- | ---------------------------- | -------------------------- |
| id            | string                                                       | так            | Унікальний ID                |                            |
| title         | string                                                       | так            | Назва                        |                            |
| description   | string                                                       | ні             | Опис                         |                            |
| picture       | string                                                       | ні             | URL зображення               |                            |
| status        | [TaskStatus](/constants/task#taskstatus)                     | так            | Статус                       |                            |
| startDate     | string                                                       | так            | Дата початку                 | ISO string                 |
| startTime     | string                                                       | так            | Час початку                  | ISO string                 |
| endDate       | string                                                       | ні             | Дата завершення              | ISO string                 |
| location      | `{ lat: number; lng: number }`                               | ні             | Координати                   | перетворюється з geography |
| locationName  | string                                                       | ні             | Назва локації                |                            |
| amount        | number                                                       | ні             | Необхідна сума               |                            |
| currentAmount | number                                                       | ні             | Поточна сума                 |                            |
| currency      | string                                                       | ні             | Валюта                       |                            |
| requirements  | string                                                       | ні             | Вимоги                       |                            |
| categories    | [CategoryType](/constants/task#categorytype)[]               | так/ні         | Категорії                    | залежить від endpoint      |
| host          | `{ user: User \| null; organization: Organization \| null }` | так            | Хост таски                   | relation field             |
| joinedUsers   | User[]                                                       | ні             | Користувачі, які приєдналися | relation field             |
| createdAt     | string                                                       | так            | Дата створення               | ISO string                 |
| updatedAt     | string                                                       | так            | Дата оновлення               | ISO string                 |

### Приклад: task від користувача

```json
{
  "id": "task_1",
  "title": "TASK",
  "description": "Description of task",
  "status": "PENDING",
  "startDate": "2026-03-30T00:00:00.000Z",
  "startTime": "2026-03-30T02:25:00.000Z",
  "endDate": "2026-04-01T00:00:00.000Z",
  "location": {
    "lat": 48.123,
    "lng": 10.456
  },
  "locationName": "Memmingen",
  "amount": 100,
  "currentAmount": 0,
  "currency": "EUR",
  "requirements": "Bring gloves",
  "categories": ["NATURE"],
  "host": {
    "user": {
      "id": "4e53467c-5377-420c-a7f8-5710fefa9896",
      "name": "User Example",
      "createdAt": "2026-03-16T20:45:46.422",
      "updatedAt": "2026-03-16T20:50:05.121"
    },
    "organization": null
  },
  "joinedUsers": [],
  "createdAt": "2026-03-16T20:45:46.422Z",
  "updatedAt": "2026-03-16T20:50:05.121Z"
}
```

### Приклад: task від організації

```json
{
  "id": "task_2",
  "title": "Organization Task",
  "description": "Created by organization",
  "status": "PENDING",
  "startDate": "2026-03-30T00:00:00.000Z",
  "startTime": "2026-03-30T02:25:00.000Z",
  "categories": ["NATURE"],
  "host": {
    "user": null,
    "organization": {
      "id": "314444ad-f624-40cd-b9db-63395219d5e2",
      "name": "Amazon",
      "createdAt": "2026-03-16T22:17:33.263"
    }
  },
  "joinedUsers": []
}
```

<!-- ![TaskMermaid](/public/diagrams/task.svg) -->

<!-- ```mermaid
erDiagram
  "Task" {
    String id "🗝️"
    String title 
    String description 
    String picture "❓"
    TaskStatus status 
    Int hostId
    DateTime startDate 
    DateTime startTime 
    DateTime endDate "❓"
    Int locationId "❓"
    geography location "❓"
    String locationName "❓"
    CategoryType categories 
    Int amount "❓"
    Int current_amount "❓"
    String currency "❓"
    String requirements "❓"
    DateTime createdAt 
    DateTime updatedAt 
    }
``` -->
<!-- 
 id            | text                           |           | not null | gen_random_uuid()::text
 title         | text                           |           | not null |
 description   | text                           |           | not null |
 picture       | text                           |           |          |
 status        | "TaskStatus"                   |           | not null | 'PENDING'::"TaskStatus"
 hostId        | integer                        |           | not null |
 startDate     | timestamp(3) without time zone |           | not null |
 startTime     | timestamp(3) without time zone |           | not null |
 endDate       | timestamp(3) without time zone |           |          |
 locationId    | integer                        |           |          |
 categories    | "CategoryType"[]               |           |          |
 createdAt     | timestamp(3) without time zone |           | not null | CURRENT_TIMESTAMP
 updatedAt     | timestamp(3) without time zone |           | not null |
 location      | geography                      |           |          |
 amount        | integer                        |           |          |
 currency      | text                           |           |          |
 requirements  | text                           |           |          |
 currentAmount | integer                        |           |          |
 locationName  | text                           |           |          |
 -->
