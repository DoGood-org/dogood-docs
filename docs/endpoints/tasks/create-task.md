# POST /task

## Призначення
Створення нового завдання.

## Авторизація
Потрібен access token.

## Request body

```json

// for user
{
  "title": "TASK 10",
  "description": "Description  of Task",
  "startDate": "2026-03-30T00:00:00.000Z",
  "startTime": "2026-03-30T02:25:00.000Z",
  "endDate": "2026-04-01T00:00:00.000Z",
  "categories": [
    "ANIMAL"
  ],
  "requirements": "requirements",
  "isOrganization": false,
  "location": { "lat": 50.4501,
    "lng": 30.5234 },
  "locationName": "Kyiv, Ukraine"
}

// for organization
{
  "title": "TASK 9",
  "description": "Description  of Task",
  "startDate": "2026-03-30T00:00:00.000Z",
  "startTime": "2026-03-30T02:25:00.000Z",
  "endDate": "2026-04-01T00:00:00.000Z",
  "categories": [
    "NATURE"
  ],
  "requirements": "requirements",
  "isOrganization": true,
  "organizationId": "314444ad-f624-40cd-b9db-63395219d5e2",
  "location": { "lat": 50.4501,
    "lng": 30.5234 },
  "locationName": "Kyiv, Ukraine"
}

```

## Поля

| Поле           | Тип                                 | Обов'язкове | Опис                                                      |
| -------------- | ----------------------------------- | :---------: | --------------------------------------------------------- |
| title          | string                              |     так     | Назва. Мінімум 1 символ                                   |
| description    | string                              |     так     | Опис. Мінімум 1 символ                                    |
| picture        | string (URL)                        |     ні      | URL зображення                                            |
| isOrganization | boolean                             |     так     | Чи створюється задача від організації                     |
| organizationId | string (UUID)                       |   умовно    | ID організації. Обов'язкове, якщо `isOrganization = true` |
| startDate      | string (ISO date-time)              |     так     | Дата початку (ISO формат)                                 |
| startTime      | string (ISO date-time)              |     так     | Час початку (ISO формат)                                  |
| endDate        | string (ISO date-time)              |     ні      | Дата завершення                                           |
| location       | object { lat: number, lng: number } |     ні      | Геолокація. Якщо передано — обов'язкові `lat` і `lng`     |
| locationName   | string                              |     ні      | Назва локації                                             |
| amount         | number                              |     ні      | Необхідна сума                                            |
| currency       | string                              |     ні      | Валюта                                                    |
| requirements   | string                              |     ні      | Вимоги                                                    |
| categories     | CategoryType[]                      |     так     | Масив категорій (мінімум 1)                               |


## ⚠️ Важливі правила (валідація)
- `title`, `description` → не можуть бути пустими
- `picture` → має бути валідний URL
- `startDate`, startTime, endDate → ISO datetime
- `categories` → мінімум 1 елемент

## 🔥 Умовна логіка:
- якщо isOrganization = true  
👉 organizationId обов'язковий
- якщо isOrganization = false  
👉 organizationId не можна передавати


## Що робить бекенд
1. Валідовує body
2. Створює запис у Task
3. Прив’язує завдання до користувача або організації
4. Повертає створений task DTO

## Що пишеться в БД

Task

## Response
```jsonc
// for user
{
    "status": "success",
    "code": "TASK_CREATED",
    "data": {
        "task": {
            "id": "daa566b4-8f0751",
            "title": "TASK 10",
            "description": "Description  of Task",
            "startDate": "2026-03-30T00:00:00.000Z",
            "startTime": "2026-03-30T02:25:00.000Z",
            "endDate": "2026-04-01T00:00:00.000Z",
            "locationName": "Kyiv, Ukraine",
            "status": "PENDING",
            "categories": [
                "ANIMAL"
            ],
            "host": {
                "type": "USER",
                "user": {
                    "id": "decdbe5a-914dd",
                    "name": "User Name",
                    "createdAt": "2026-03-22T23:24:46.777Z",
                    "updatedAt": "2026-03-22T23:25:23.044Z"
                }
            },
            "joinedUsers": []
        }
    }
}
//for orgaanization

{
    "status": "success",
    "code": "TASK_CREATED",
    "data": {
        "task": {
            "id": "0d18d6ed-5ab91de",
            "title": "TASK 9",
            "description": "Description  of Task",
            "startDate": "2026-03-30T00:00:00.000Z",
            "startTime": "2026-03-30T02:25:00.000Z",
            "endDate": "2026-04-01T00:00:00.000Z",
            "locationName": "Kyiv, Ukraine",
            "status": "PENDING",
            "categories": [
                "NATURE"
            ],
            "host": {
                "type": "ORGANIZATION",
                "organization": {
                    "id": "314444ad-f624-5e2",
                    "name": "Amazon",
                    "createdAt": "2026-03-16T22:17:33.263Z"
                }
            },
            "joinedUsers": []
        }
    }
}
```

## Пов’язані сутності

[Task](/entities/task)

User

Organization