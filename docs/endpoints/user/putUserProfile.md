# PUT /user/profile

## Призначення

Оновлення профілю користувача.

## Авторизація

✅ Потрібна

## Request body
```json
{
  "name": "John",
  "bio": "About me",
  "avatar": "https://...",
  "location": {
    "country": "Germany",
    "region": "Bavaria",
    "city": "Munich"
  },
  "gender": "MALE",
  "birthDate": "2000-01-01",
  "phoneNumber": "+49123456789"
}
```

## Поля
| Поле             | Тип                  | Обов'язкове | Опис                      |
| ---------------- | -------------------- | :---------: | ------------------------- |
| name             | string               |     ні      | Ім’я                      |
| bio              | string \| null       |     ні      | Біо                       |
| avatar           | string (URL) \| null |     ні      | Аватар                    |
| location         | object               |     ні      | Локація                   |
| location.*       | string               |    так*     | Обов’язкові якщо передано |
| gender           | enum                 |     ні      | Стать                     |
| birthDate        | Date                 |     ні      | Дата народження           |
| phoneNumber      | string               |     ні      | Телефон                   |
| stripeCustomerId | string \| null       |     ні      | Stripe ID                 |

## ⚠️ Валідація
- якщо поле `name` передано → не може бути пустим
- `avatar` → валідний URL або ""
- `phoneNumber` → regex
- `birthDate` → не в майбутньому

## Додаткова логіка
- profile → upsert
- location → upsert
- user.name оновлюється окремо

## Що робить бекенд
1. Перевіряє авторизацію
2. Валідовує body
3. Оновлює:
   - User (name, stripeCustomerId)
   - UserProfile (upsert)
   - Location (upsert)
4. Завантажує оновленого користувача
5. sanitizeUser
6. Повертає

## Response
```json
{
  "status": "success",
  "code": "USER_PROFILE_UPDATED",
  "data": {
    "user": {
      "id": "4e53467c-5377-420c-a7f8-5710fefa9896",
      "email": "user@email.com",
      "name": "Updated Name",
      "siteRole": "USER",
      "isEmailVerified": true,

      "locationId": 10,
      "stripeCustomerId": null,

      "createdAt": "2026-03-16T20:45:46.422Z",
      "updatedAt": "2026-04-27T12:00:00.000Z",

      "profile": {
        "id": 1,
        "userId": "4e53467c-5377-420c-a7f8-5710fefa9896",
        "bio": "Updated bio",
        "avatar": "https://example.com/new-avatar.png",
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

      "organizations": [],

      "tasks": []
    }
  }
}
```

## ❌ Помилки
| Код               | HTTP | Опис              |
| ----------------- | ---- | ----------------- |
| AUTH_UNAUTHORIZED | 401  | Не авторизований  |
| VALIDATION_ERROR  | 400  | Помилка валідації |
