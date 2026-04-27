# GET /user/profile/:id

## Призначення

Отримання повного профілю користувача (внутрішнє використання).

> [!NOTE]⚠️ Не є публічним профілем
Використовується для налаштувань / внутрішньої логіки

## Авторизація

❌ Не потрібна (на даний момент)

⚠️ але фактично повертає багато даних → варто подумати про обмеження доступу

## Path params
| Параметр | Тип    | Обов'язкове | Опис           |
| -------- | ------ | :---------: | -------------- |
| id       | string |     так     | ID користувача |

## Додаткова логіка
- користувач має існувати
- дані проходять через `sanitizeUser()`

## Що робить бекенд
1. Перевіряє наявність `id`
2. Завантажує користувача через `findUserById`
3. Якщо не знайдено → `404`
4. Очищає через `sanitizeUser()`
5. Повертає user

## Response
```json
{
  "status": "success",
  "code": "USER_PROFILE_RETRIEVED",
  "data": {
    "user": {
      "id": "4e53467c-5377-420c-a7f8-5710fefa9896",
      "email": "user@email.com",
      "name": "User Example",
      "siteRole": "USER",
      "isEmailVerified": true,

      "locationId": null,
      "stripeCustomerId": null,

      "createdAt": "2026-03-16T20:45:46.422Z",
      "updatedAt": "2026-03-16T20:50:05.121Z",

      "profile": {
        "id": 1,
        "userId": "4e53467c-5377-420c-a7f8-5710fefa9896",
        "bio": "About me",
        "avatar": "https://example.com/avatar.png",
        "gender": "FEMALE",
        "birthDate": "2000-01-01T00:00:00.000Z",
        "phoneNumber": "+49123456789"
      },

      "userSettings": {
        "id": 1,
        "userId": "4e53467c-5377-420c-a7f8-5710fefa9896",
        "theme": "dark",
        "language": "en"
      },

      "location": {
        "id": 10,
        "country": "Germany",
        "region": "Bavaria",
        "city": "Munich"
      },

      "joinedTasks": [],

      "reviewsWrittenUser": [],
      "reviewsReceived": [],

      "organizations": [
        {
          "id": "314444ad-f624-40cd-b9db-63395219d5e2",
          "name": "Amazon",
          "avatar": null,
          "description": "Amazon Service",
          "role": "ADMIN",
          "status": "ACTIVE",
          "joinedAt": "2026-03-16T22:17:33.263Z",
          "membersCount": 2
        }
      ],

      "tasks": []
    }
  }
}
```

## ❌ Помилки
| Код              | HTTP | Опис                    |
| ---------------- | ---- | ----------------------- |
| VALIDATION_ERROR | 400  | Некоректний id          |
| USER_NOT_FOUND   | 404  | Користувача не знайдено |
