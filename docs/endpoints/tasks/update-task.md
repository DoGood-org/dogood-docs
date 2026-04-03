# PATCH /task/:id

## Призначення

Оновлення існуючого завдання (часткове оновлення полів).

## Авторизація

Потрібен access token.

## Request params

| Параметр | Тип    | Обов'язкове | Опис               |
| -------- | ------ | :---------: | ------------------ |
| id       | string |     так     | ID завдання (UUID) |

## Request body
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "startDate": "2026-04-01T00:00:00.000Z",
  "location": { "lat": 50.4501, "lng": 30.5234 },
  "categories": ["NATURE"]
}
```
👉 можна передавати будь-яку підмножину полів  
👉 не можна змінювати host і status

## Поля

| Поле          | Тип                                            | Обов'язкове | Опис                                                  |
| ------------- | ---------------------------------------------- | :---------: | ----------------------------------------------------- |
| title         | string                                         |     ні      | Назва. Мінімум 1 символ                               |
| description   | string                                         |     ні      | Опис                                                  |
| picture       | string (URL)                                   |     ні      | URL зображення                                        |
| startDate     | string                                         |    Date     | ні                                                    | Дата початку    |
| startTime     | string                                         |    Date     | ні                                                    | Час початку     |
| endDate       | string                                         |    Date     | ні                                                    | Дата завершення |
| location      | object { lat: number, lng: number }            |     ні      | Геолокація. Якщо передано — обов'язкові `lat` і `lng` |
| locationName  | string                                         |     ні      | Назва локації                                         |
| amount        | number                                         |     ні      | Необхідна сума                                        |
| currentAmount | number                                         |     ні      | Поточна зібрана сума                                  |
| currency      | string                                         |     ні      | Валюта                                                |
| requirements  | string                                         |     ні      | Вимоги                                                |
| categories    | [CategoryType[]](/constants/task#categorytype) |     ні      | Масив категорій                                       |

## ⚠️ Важливі правила (валідація)
- всі поля optional (PATCH)
- title → якщо передано, не може бути пустим
- picture → має бути валідний URL
- startDate, startTime, endDate → string або Date
- categories → масив enum значень
- location → якщо передано, обов’язкові lat і lng

## 🔥 Окремий кейс: оновлення статусу
```ts
{
  status: TaskStatus
}
```

👉 використовується окрема схема:

updateTaskStatusSchema


## Що робить бекенд
1. Валідовує body
2. Знаходить task по id
3. Оновлює тільки передані поля
4. Зберігає зміни в БД
5. Повертає оновлений task DTO

## Що пишеться в БД

[Task](/entities/task#_2-task-db-model) (update існуючого запису)

## Response
```json
{
  "status": "success",
  "code": "TASK_UPDATED",
  "data": {
    "task": {
      "id": "daa566b4-8f0751",
      "title": "Updated title",
      "description": "Updated description",
      "startDate": "2026-04-01T00:00:00.000Z",
      "startTime": "2026-03-30T02:25:00.000Z",
      "endDate": "2026-04-02T00:00:00.000Z",
      "locationName": "Kyiv, Ukraine",
      "status": "PENDING",
      "categories": ["NATURE"],
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
```

## Пов’язані сутності

[Task](/entities/task)

User
Organization

## 💡 Важливий момент (архітектурно)

👉 це partial update (PATCH)

Тобто:
- не треба передавати всі поля
- тільки ті, які змінюються
- бекенд не перезаписує інші