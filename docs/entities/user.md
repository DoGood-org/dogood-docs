# 👤 User

## Опис

Сутність користувача системи.

## Включає:

- облікові дані (email, password)
- статус верифікації email
- профіль користувача (UserProfile)
- налаштування (UserSettings)
- refresh tokens
- зв’язки з tasks, organizations, reviews, chats тощо

## Представлення сутності

В системі User розділено на декілька DTO:

| DTO         | Призначення                       |
| ----------- | --------------------------------- |
| Auth DTO    | логін / реєстрація                |
| FullUser    | внутрішні сервіси та current-user |
| PublicUser  | публічна сторінка профіля         |
| UserPreview | коротке представлення користувача |

## 1. Auth Request DTO
### 🔐 Sign Up
| Поле     | Тип    | Обов'язкове | Опис                        |
| -------- | ------ | :---------: | --------------------------- |
| name     | string |     так     | Ім’я (3–30 символів)        |
| email    | string |     так     | Валідний email              |
| password | string |     так     | Пароль (мінімум 6 символів) |

### 🔑 Login
| Поле     | Тип    | Обов'язкове | Опис           |
| -------- | ------ | :---------: | -------------- |
| email    | string |     так     | Валідний email |
| password | string |     так     | Пароль         |

### 🔁 Forgot Password
| Поле  | Тип    | Обов'язкове | Опис              |
| ----- | ------ | :---------: | ----------------- |
| email | string |     так     | Email користувача |

### 🔄 Reset Password
| Поле     | Тип    | Обов'язкове | Опис                              |
| -------- | ------ | :---------: | --------------------------------- |
| password | string |     так     | Новий пароль (мінімум 6 символів) |


## 2. User DB Model
ERD

<Diagram name="userERD" className="big-diagram"/>

[Докладніше про зв'язки моделей користувача в БД](/models/user)

### User
| Поле                       | Тип                                      | Обов'язкове | Опис                          |
| -------------------------- | ---------------------------------------- | :---------: | ----------------------------- |
| id                         | string                                   |     так     | UUID                          |
| email                      | string                                   |     так     | Унікальний email              |
| name                       | string                                   |     так     | Ім’я                          |
| password                   | string                                   |     так     | Хешований пароль              |
| siteRole                   | [SiteRole](/constants/user#siterole)     |     так     | USER / ADMIN                  |
| isEmailVerified            | boolean                                  |     так     | Чи підтверджений email        |
| emailVerificationCode      | string                                   |     ні      | Код підтвердження             |
| emailVerificationExpiresAt | DateTime                                 |     ні      | Термін дії коду               |
| resetPasswordToken         | string                                   |     ні      | Токен скидання пароля         |
| resetPasswordExpiresAt     | DateTime                                 |     ні      | Термін дії reset token        |
| locationId                 | number                                   |     ні      | FK → Location                 |
| stripeCustomerId           | string                                   |     ні      | Stripe customer ID            |
| createdAt                  | DateTime                                 |     так     | Дата створення                |
| updatedAt                  | DateTime                                 |     так     | Дата оновлення                |
| status                     | [UserStatus](/constants/user#userstatus) |     так     | Статус користувача            |
| banType                    | [BlockType](/constants/user#blocktype)   |     ні      | Тип блокування                |
| banReason                  | string                                   |     ні      | Причина блокування            |
| banExpiresAt               | DateTime                                 |     ні      | Дата завершення бану          |
| bannedById                 | string                                   |     ні      | FK → User.id (хто заблокував) |

**UserStatus**
| Значення | Опис         |
| -------- | ------------ |
| ACTIVE   | Активний     |
| BANNED   | Заблокований |

**BlockType**
| Значення   | Опис                  |
| ---------- | --------------------- |
| THREE_DAYS | Бан на 3 дні          |
| ONE_WEEK   | Бан на 1 тиждень      |
| ONE_MONTH  | Бан на 1 місяць       |
| CUSTOM     | Користувацький термін |
| PERMANENT  | Постійний бан         |

<!-- 
### UserProfile
| Поле        | Тип                 | Обов'язкове | Опис            |
| ----------- | ------------------- | :---------: | --------------- |
| id          | number              |     так     | ID              |
| userId      | string              |     так     | FK → User       |
| bio         | string   \|    null |     ні      | Біографія       |
| avatar      | string   \|    null |     ні      | URL аватарки    |
| gender      | Gender   \|    null |     ні      | Стать           |
| birthDate   | DateTime \|    null |     ні      | Дата народження |
| phoneNumber | string   \|    null |     ні      | Телефон         |


### UserSettings
| Поле     | Тип    | Обов'язкове | Опис          |
| -------- | ------ | :---------: | ------------- |
| id       | number |     так     | ID            |
| userId   | string |     так     | FK → User     |
| theme    | string |     так     | light / dark  |
| language | string |     так     | en / de / ... |


### RefreshToken
| Поле      | Тип                 | Обов'язкове | Опис           |
| --------- | ------------------- | :---------: | -------------- |
| id        | string              |     так     | UUID           |
| token     | string              |     так     | Refresh token  |
| userId    | string              |     так     | FK → User      |
| ip        | string   \|    null |     ні      | IP адреса      |
| userAgent | string   \|    null |     ні      | User agent     |
| createdAt | DateTime            |     так     | Дата створення |
| expiresAt | DateTime            |     так     | Термін дії     |
| revoked   | boolean             |     так     | Чи відкликаний |
| updatedAt | DateTime            |     так     | Дата оновлення |
-->

## 3. Auth/User Response DTO
### 🔹 Auth Response

👉 використовується:
-  `/auth/login`

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

### 🔹 FullUser

👉 використовується:
- `/auth/current-user`
- внутрішні сервіси
- редагування профіля

**Поля**
| Поле             | Тип                                                | Опис                          |
| ---------------- | -------------------------------------------------- | ----------------------------- |
| id               | string                                             | ID                            |
| email            | string                                             | Email                         |
| name             | string                                             | Ім’я                          |
| siteRole         | [SiteRole](/constants/user#siterole)               | Роль                          |
| isEmailVerified  | boolean                                            | Статус email                  |
| stripeCustomerId | string             \| null                         | Stripe customer               |
| profile          | [UserProfile](user-profile)                \| null | Профіль                       |
| location         | Location                   \| null                 | Локація                       |
| userSettings     | [UserSettings](user-settings)                      | Налаштування                  |
| organizations    | UserOrganization[]                                 | Організації                   |
| tasks            | Task[]                                             | Hosted + joined tasks         |
| createdAt        | DateTime                                           | Дата створення                |
| updatedAt        | DateTime                                           | Дата оновлення                |
| status           | UserStatus                                         | Статус користувача            |
| banType          | BlockType   \| null                                | Тип блокування                |
| banReason        | string   \| null                                   | Причина блокування            |
| banExpiresAt     | DateTime      \| null                              | Дата завершення бану          |
| bannedById       | string       \| null                               | FK → User.id (хто заблокував) |

Приклад
```json
{
  "id": "uuid",
  "email": "user@email.com",
  "name": "User Example",
  "siteRole": "USER",
  "isEmailVerified": true,
  "stripeCustomerId": null,
  "status": "ACTIVE",
  "banType": null,
  "banReason": null,
  "banExpiresAt": null,
  "bannedById": null

  "profile": {
    "bio": "About me",
    "avatar": "https://example.com/avatar.jpg"
  },

  "location": {
    "id": 1,
    "country": "Germany",
    "region": "Bavaria",
    "city": "Munich"
  },

  "userSettings": {
    "id": 1,
    "theme": "dark",
    "language": "en"
  },

  "organizations": [],

  "tasks": []
}
```

### 🔹PublicUser

👉 використовується:
- `GET /user/profile/public/:id`

**Особливості**

PublicUser:

- не містить sensitive fields
- не містить refreshTokens
- не містить settings
- не містить email

Поля
| Поле            | Тип                                        | Опис                  |
| --------------- | ------------------------------------------ | --------------------- |
| id              | string                                     | ID                    |
| name            | string                                     | Ім’я                  |
| createdAt       | DateTime                                   | Дата створення        |
| profile         | [UserProfile](user-profile)        \| null | Профіль               |
| location        | Location           \| null                 | Локація               |
| organizations   | UserOrganization[]                         | Організації           |
| reviewsReceived | Review[]                                   | Отримані reviews      |
| tasks           | Task[]                                     | Hosted + joined tasks |


Приклад
```json
{
  "status": "success",
  "code": "USER_PROFILE_RETRIEVED",
  "data": {
    "user": {
      "id": "4e53467",
      "name": "User Example",

      "createdAt": "2026-03-16T20:45:46.422Z",

      "profile": {
        "bio": "About me",
        "avatar": "https://example.com/avatar.jpg"
      },

      "location": null,

      "organizations": [],

      "reviewsReceived": [],

      "tasks": []
    }
  }
}
```

### 🔹 UserPreview

👉 використовується:

- joinedUsers
- participants
- host.user
- search users

Поля
| Поле   | Тип            | Опис       |
| ------ | -------------- | ---------- |
| id     | string         | ID         |
| name   | string         | Ім’я       |
| avatar | string \| null | Avatar URL |

Приклад

```json
{
  "id": "decdbe5a-914dd",
  "name": "User Name",
  "avatar": "https://example.com/avatar.jpg"
}
```

## ⚠️ Важливі правила
🔐 Безпека

Ніколи не повертаються:

- password
- emailVerificationCode
- emailVerificationExpiresAt
- resetPasswordToken
- resetPasswordExpiresAt
- refreshTokens

Sensitive fields видаляються через:
```ts
sanitizeUser()
```

## 🔁 Refresh Token Flow
- access token → короткоживучий
- refresh token → довгоживучий
- refresh token зберігається в БД
- logout → refresh tokens видаляються

## 🔥 Валідація
| Поле     | Правило            |
| -------- | ------------------ |
| email    | Валідний email     |
| password | Мінімум 6 символів |
| name     | 3–30 символів      |

## 🚫 User Ban System {#user-ban-system}
Користувач може мати один із статусів:

- ACTIVE
- BANNED (заблокований)

При блокуванні зберігається:
- тип блокування
- причина
- дата завершення
- адміністратор, який виконав блокування

### Типи блокування

- THREE_DAYS
- ONE_WEEK
- ONE_MONTH
- CUSTOM
- PERMANENT

### Автоматичний розбан

Для тимчасових блокувань система автоматично перевіряє:

- чи завершився термін блокування;
- якщо так — статус користувача змінюється на ACTIVE;
- дані про блокування очищаються:
  - `banType`
  - `banReason`
  - `banExpiresAt`
  - `bannedById`

Перевірка виконується під час:
- POST /auth/login
- POST /auth/refresh-token
- authenticateUser middleware

Таким чином користувач автоматично розбанюється після завершення терміну тимчасового блокування без додаткових дій адміністратора.

## Архітектурний момент
| DTO         | Де використовується             |
| ----------- | ------------------------------- |
| FullUser    | current-user, внутрішні сервіси |
| PublicUser  | публічний профіль               |
| UserPreview | списки / host / participants    |

## Пов’язані сутності
- [UserProfile](user-profile)
- [UserSettings](user-settings)
- [RefreshToken](refresh-token)
- Location
- Organization
- [Task](task)
- Review