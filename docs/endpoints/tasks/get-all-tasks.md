# GET /task

## Призначення

Отримання списку всіх задач.

## Авторизація

❌ Не обов’язкова 

## Query params

Немає (на даний момент)  
(можна буде розширити: pagination, filters і т.д.)

## Request body

❌ Відсутній

## Response
```json
{
  "message": "Tasks fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Help animals",
      "description": "Feed stray dogs",
      "picture": null,
      "startDate": "2026-03-30T00:00:00.000Z",
      "startTime": "2026-03-30T02:25:00.000Z",
      "endDate": null,
      "location": {
        "lat": 50.4501,
        "lng": 30.5234
      },
      "locationName": "Kyiv, Ukraine",
      "status": "PENDING",
      "amount": 1000,
      "currentAmount": 200,
      "currency": "USD",
      "requirements": "Food and water",
      "categories": ["ANIMAL", "DONATION"],
      "host": {
        "type": "USER",
        "user": {
          "id": 1,
          "name": "User Name"
        }
      },
      "joinedUsers": [
        {
          "id": 2,
          "name": "Another User"
        }
      ]
    }
  ]
}
```

## Поля Response

| Поле    | Тип                                           | Опис                    |
| ------- | --------------------------------------------- | ----------------------- |
| message | string                                        | Повідомлення результату |
| data    | [Task](/entities/task#_3-task-response-dto)[] | Масив задач             |


## ⚠️ Важливі нюанси
- picture, endDate, location, locationName, amount, currentAmount, currency, requirements → можуть бути null
- location → або повністю null, або повний об’єкт
- joinedUsers → може бути пустим масивом
- categories → завжди масив

## Що робить бекенд
1. Отримує список задач (можливо з кешу)
2. Формує DTO (CachedTask)
3. Повертає масив задач

## Що читається з БД

[Task](/entities/task#_2-task-db-model)  
User  
Organization  
Host 

## Пов’язані сутності

[Task](/entities/task)  
User  
Organization