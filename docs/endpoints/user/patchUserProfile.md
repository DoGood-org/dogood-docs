# PATCH /user/profile

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
| Поле             | Тип                  | Обов'язкове | Опис                        |
| ---------------- | -------------------- | :---------: | --------------------------- |
| name             | string               |     ні      | Ім’я                        |
| bio              | string \| null       |     ні      | Біо                         |
| avatar           | string (URL) \| null |     ні      | Аватар                      |
| location         | object               |     ні      | Локація                     |
| location.*       | string               |    так*     | Обов’язкові якщо передано   |
| gender           | enum                 |     ні      | Стать MALE / FEMALE / OTHER |
| birthDate        | Date                 |     ні      | Дата народження             |
| phoneNumber      | string               |     ні      | Телефон                     |
| stripeCustomerId | string \| null       |     ні      | Stripe ID                   |

## ⚠️ Валідація
- якщо поле `name` передано → не може бути пустим
- `avatar` → валідний URL або ""
- `phoneNumber` → regex
- `birthDate` → не в майбутньому
- `bio` → максимум 500 символів

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
4. Повертає оновлений user DTO

## Response
```json
{
  "status": "success",
  "code": "USER_PROFILE_UPDATED",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@email.com",
      "name": "John Doe",
      "siteRole": "USER",
      "isEmailVerified": true,
      "profile": {
        "bio": "",
        "avatar": "https://example.com/avatar.jpg",
        "gender": "MALE",
        "birthDate": "1995-01-10T00:00:00.000Z",
        "phoneNumber": "+49123456789"
      },
      "location": {
        "id": 1,
        "country": "Germany",
        "region": "Bavaria",
        "city": "Munich"
      }
    }
  }
}
```

## ❌ Помилки
| Код               | HTTP | Опис              |
| ----------------- | ---- | ----------------- |
| AUTH_UNAUTHORIZED | 401  | Не авторизований  |
| VALIDATION_ERROR  | 400  | Помилка валідації |


