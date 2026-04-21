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
- пароль має співпадати (bcrypt compare)
- користувач НЕ може увійти, якщо email не підтверджений (isEmailVerified)
- створюється:
  - access token (JWT)
  - refresh token (зберігається в БД)

## Що робить бекенд
1. Валідовує body
2. Шукає користувача по email
3. Перевіряє `isEmailVerified`
4. Перевіряє пароль
5. Генерує access token
6. Генерує refresh token
7. Зберігає refresh token в БД
8. Встановлює cookies з токенами
9. Повертає user

## Що пишеться в БД
- [RefreshToken](/entities/user#refreshtoken) (новий запис)

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
| Код                      | HTTP | Опис                      |
| ------------------------ | ---- | ------------------------- |
| AUTH_INVALID_CREDENTIALS | 400  | Невірний email або пароль |
| AUTH_EMAIL_NOT_VERIFIED  | 403  | Email не підтверджений    |


## Пов’язані сутності

[User](/entities/user)

RefreshToken