# GET /auth/current-user

## Призначення

Отримання повних даних поточного авторизованого користувача.

## Авторизація

✅ Потрібна
- використовується `accessToken` (httpOnly cookie)
- middleware: `authenticateUser`

## 🔥 Додаткова логіка
- токен береться з `cookies.accessToken`
- користувач:
  - має існувати
  - має бути `isEmailVerified = true`
  - дані користувача проходять через sanitizeUser()

## Що робить бекенд
1. Перевіряє наявність `accessToken` у cookies
2. Валідовує JWT (`verifyToken`)
3. Дістає userId
4. Завантажує користувача через `authServices.findUserById`
5. Перевіряє:
   - чи існує користувач
   - чи підтверджений email
6. Очищає дані через `sanitizeUser()`
7. Кладе результат у `req.user`
8. Повертає його у `response`

## Response
```json
{
  "status": "success",
  "message": "User data retrieved",
  "code": "USER_DATA_RETRIEVED",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "siteRole": "USER | ADMIN",
    "isEmailVerified": true,

    "createdAt": "string (ISO date-time)",
    "updatedAt": "string (ISO date-time)",

    "profile": {
      "id": "number",
      "userId": "string",
      "bio": "string | null",
      "avatar": "string | null",
      "gender": "MALE | FEMALE | OTHER | null",
      "birthDate": "string (ISO date-time) | null",
      "phoneNumber": "string | null"
    },

    "userSettings": {
      "id": "number",
      "userId": "string",
      "theme": "light | dark",
      "language": "string"
    },

    "location": {
      "id": "number",
      "country": "string",
      "region": "string",
      "city": "string"
    },

    "joinedTasks": [
      {
        "id": "string",
        "title": "string"
      }
    ],

    "organizations": [
      {
        "id": "string",
        "name": "string",
        "avatar": "string | null",
        "description": "string | null",
        "role": "string",
        "status": "string",
        "joinedAt": "string",
        "membersCount": "number"
      }
    ],

    "tasks": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "picture": "string | null",
        "startDate": "string",
        "startTime": "string",
        "endDate": "string | null",
        "location": {
          "lat": "number",
          "lng": "number"
        },
        "locationName": "string | null",
        "amount": "number | null",
        "currentAmount": "number | null",
        "currency": "string | null",
        "requirements": "string | null",
        "status": "string",
        "categories": ["string"],
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
}
```

## ⚠️ Важливо

❌ НЕ повертається:

- password
- refreshTokens # !!! додати
- resetPasswordToken
- emailVerificationCode

👉 це гарантується через `sanitizeUser()`

## ❌ Можливі помилки
| Код                        | HTTP | Опис                         |
| -------------------------- | ---- | ---------------------------- |
| AUTH_REFRESH_TOKEN_INVALID | 401  | Токен відсутній / невалідний |
| USER_NOT_FOUND             | 404  | Користувача не знайдено      |
| AUTH_EMAIL_NOT_VERIFIED    | 403  | Email не підтверджений       |

## 🔐 Безпека
- використовується httpOnly cookie
- JWT не доступний з JS
- дані проходять через sanitizeUser
- неможливо отримати sensitive поля

## Пов’язані сутності

[User](/entities/user)

[Task](/entities/task)

Organization