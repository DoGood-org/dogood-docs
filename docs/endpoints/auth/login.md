# POST /auth/login

## Призначення

Авторизація користувача (логін).

## Авторизація

❌ Не потрібна

## Request body
```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

## Поля
| Поле     | Тип    | Обов'язкове | Опис               |
| -------- | ------ | :---------: | ------------------ |
| email    | string |     так     | Валідний email     |
| password | string |     так     | Мінімум 6 символів |

## ⚠️ Важливі правила (валідація)
- `email` → валідний формат
- `password` → мінімум 6 символів

## 🔥 Додаткова логіка
- користувач має існувати
- перевіряється статус користувача
- забанений користувач не може авторизуватися
- якщо термін тимчасового бану закінчився —
  користувач автоматично розбанюється
- користувач НЕ може увійти, якщо email не підтверджений (`isEmailVerified`)
- пароль має співпадати (`bcrypt compare`)
- створюється:
  - access token (JWT)
  - refresh token (зберігається в БД)

## Що робить бекенд
1. Валідовує body
2. Шукає користувача по email
3. Перевіряє статус користувача
4. Якщо користувач забанений:
   - перевіряє чи не закінчився термін бану
   - за потреби автоматично знімає бан
5. Перевіряє `isEmailVerified`
6. Перевіряє пароль
7. Генерує access token
8. Генерує refresh token
9. Зберігає refresh token в БД
10. Встановлює cookies з токенами
11. Видаляє прострочені refresh token
12. Повертає інформацію про користувача

## Що пишеться в БД
- [RefreshToken](/entities/refresh-token) (новий запис)

## Response
```json
{
  "message": "User logged in successfully",
  "code": "USER_LOGGED_IN",
  "user": {
    "id": "uuid",
    "name": "User Example",
    "email": "user@email.com",
    "avatar": null,
    "siteRole": "USER",
    "settings": {
      "theme": "dark",
      "language": "en"
    },
    "profile": null
  }
}
```

## 🚫 Заблокований користувач

Якщо обліковий запис має активне блокування, вхід буде відхилений.

Cookies очищаються:

- accessToken
- refreshToken

### Response

HTTP: `403 Forbidden`

```json
{
  "message": "Access denied. Account suspended.",
  "code": "USER_WAS_BANNED",
  "bannedUser": {
    "accountId": "user-id",
    "suspendedOn": "2026-06-01T12:00:00.000Z",
    "suspensionType": "ONE_WEEK",
    "reason": "Access restricted due to a community guidelines violation",
    "banExpiresAt": "2026-06-08T12:00:00.000Z"
  }
}
```

## ⚠️ Важливо
- password ❌ не повертається
- refreshToken ✔️ зберігається в БД

## 🍪 Cookies
| Cookie       | Тип      | Опис                                |
| ------------ | -------- | ----------------------------------- |
| accessToken  | httpOnly | ~15 хв, httpOnly, sameSite=lax/none |
| refreshToken | httpOnly | довгоживучий, httpOnly              |

## 🔁 Token flow
Access Token
- короткий час життя (15 хв)
- передається автоматично через httpOnly cookies
- використовується для авторизації запитів

Refresh Token
- довгий час життя
- зберігається в БД
- використовується для отримання нового access token

## ❌ Можливі помилки
| Код                      | HTTP | Опис                                       |
| ------------------------ | ---- | ------------------------------------------ |
| AUTH_INVALID_CREDENTIALS | 400  | Невірний email або пароль                  |
| AUTH_EMAIL_NOT_VERIFIED  | 403  | Email не підтверджений                     |
| USER_WAS_BANNED          | 403  | Обліковий запис заблоковано (бан активний) |



## Пов’язані сутності

- [User](/entities/user)
- [RefreshToken](/entities/refresh-token)