# 🔑 RefreshToken

## Опис

Сутність refresh token для JWT-авторизації.

Використовується для:

- оновлення access token
- підтримки сесії користувача
- logout
- revoke токенів
- захисту від reuse attack

Refresh token:

- зберігається в БД
- прив’язаний до користувача
- має термін дії
- може бути відкликаний (revoked)

## 1. RefreshToken DB Model

<img src="/diagrams/refreshToken.svg" class="diagram" />

📋 Поля
| Поле      | Тип      | Обов'язкове | Опис                         |
| --------- | -------- | :---------: | ---------------------------- |
| id        | string   |     так     | UUID                         |
| token     | string   |     так     | JWT refresh token            |
| userId    | string   |     так     | FK → User.id                 |
| ip        | string   |     ні      | IP адреса користувача        |
| userAgent | string   |     ні      | User-Agent браузера/пристрою |
| revoked   | boolean  |     так     | Чи відкликаний токен         |
| expiresAt | DateTime |     так     | Термін дії refresh token     |
| createdAt | DateTime |     так     | Дата створення               |
| updatedAt | DateTime |     так     | Дата останнього оновлення    |

## 2. Transport Layer / Cookies

### 🍪 Cookies
| Cookie       | Тип      | Опис               |
| ------------ | -------- | ------------------ |
| accessToken  | httpOnly | Короткоживучий JWT |
| refreshToken | httpOnly | Довгоживучий JWT   |

### 🔁 Token Flow

**Access Token**
- короткий термін життя (~15 хв)
- зберігається в httpOnly cookies
- використовується для авторизації  

**Refresh Token**
- довгий термін життя (~30 днів)
- зберігається:
- в httpOnly cookies
- в БД (RefreshToken)
- використовується для генерації нового access token

### 🔄 Refresh Flow
1. accessToken expired
2. frontend calls POST /auth/refresh-token
3. backend validates refreshToken
4. backend revokes old token
5. backend creates new refreshToken
6. backend returns new cookies

### Revoke логіка

При:
- logout
- rotation
- reuse detection

токен позначається:
```json
{
  "revoked": true
}
```

### Grace Period Protection

У refresh flow реалізований захист від race condition.

Якщо refresh token:

- вже revoked
- але був оновлений менше ніж 15 секунд тому

бекенд:

- НЕ вважає це атакою
- повертає success response

### Reuse Detection

Якщо revoked token використовується повторно після grace period:

- бекенд вважає це potential token reuse attack
- refresh відхиляється

## 3. RefreshToken Response DTO
🔹 Login Response
```json
{
  "message": "User logged in successfully",
  "code": "USER_LOGGED_IN"
}
```
Cookies:

- accessToken
- refreshToken

🔹 Refresh Response
```json
{
  "message": "Tokens refreshed successfully",
  "code": "AUTH_TOKEN_REFRESHED_SUCCESSFULY"
}
```

##  Безпека
- refresh token ніколи не повертається в JSON response
- refresh token зберігається лише:
    - в cookies
    - в БД
- cookies:
    - httpOnly
    - secure (production)
    - sameSite protection

## 🔗 Пов’язані роути
- [POST /auth/login](/endpoints/auth/login)
- [POST /auth/logout](/endpoints/auth/logout)
- [POST /auth/refresh-token](/endpoints/auth/refresh-token)

## 🔗 Пов’язані сутності
- [User](user)