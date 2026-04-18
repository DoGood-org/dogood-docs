# 👤 User

## Опис

Сутність користувача системи.

Включає:

- облікові дані (email, password)
- статус верифікації
- профіль (UserProfile)
- налаштування (UserSettings)
- токени авторизації (RefreshToken)
- зв’язки (tasks, organizations, chats тощо)


## Представлення сутності

Тут важливо розділення:

- Auth DTO (Request) → для логіну/реєстрації
- User DB Model → як зберігається в БД
- User Response DTO → що отримує фронт

## 📥 Auth Request DTO
### 🔐 Sign Up
| Поле     | Тип    | Обов'язкове | Опис                        |
| -------- | ------ | :---------: | --------------------------- |
| name     | string |     так     | Ім’я (3–30 символів)        |
| email    | string |     так     | Email (валідний формат)     |
| password | string |     так     | Пароль (мінімум 6 символів) |

### 🔑 Login
| Поле     | Тип    | Обов'язкове | Опис   |
| -------- | ------ | :---------: | ------ |
| email    | string |     так     | Email  |
| password | string |     так     | Пароль |

## 🔁 Forgot Password
| Поле  | Тип    | Обов'язкове | Опис  |
| ----- | ------ | :---------: | ----- |
| email | string |     так     | Email |

## 🔄 Reset Password
| Поле     | Тип    | Обов'язкове | Опис              |
| -------- | ------ | :---------: | ----------------- |
| password | string |     так     | Новий пароль (≥6) |

## 🗄️ User DB Model
### User
| Поле                       | Тип      | Обов'язкове | Опис                  |
| -------------------------- | -------- | :---------: | --------------------- |
| id                         | string   |     так     | UUID                  |
| email                      | string   |     так     | Унікальний email      |
| name                       | string   |     так     | Ім’я                  |
| password                   | string   |     так     | Хеш пароля            |
| siteRole                   | SiteRole |     так     | Роль (USER / ADMIN)   |
| isEmailVerified            | boolean  |     так     | Чи підтверджено email |
| emailVerificationCode      | string   |     ні      | Код підтвердження     |
| emailVerificationExpiresAt | DateTime |     ні      | Термін дії коду       |
| resetPasswordToken         | string   |     ні      | Токен скидання        |
| resetPasswordExpiresAt     | DateTime |     ні      | Термін дії токена     |
| locationId                 | number   |     ні      | FK на Location        |
| stripeCustomerId           | string   |     ні      | Stripe ID             |
| createdAt                  | DateTime |     так     | Дата створення        |
| updatedAt                  | DateTime |     так     | Дата оновлення        |

### UserProfile
| Поле        | Тип      | Обов'язкове | Опис            |
| ----------- | -------- | :---------: | --------------- |
| id          | number   |     так     | ID              |
| userId      | string   |     так     | FK -> User      |
| bio         | string   |     ні      | Біо             |
| avatar      | string   |     ні      | URL аватарки    |
| gender      | Gender   |     ні      | Стать           |
| birthDate   | DateTime |     ні      | Дата народження |
| phoneNumber | string   |     ні      | Телефон         |

### UserSettings
| Поле     | Тип    | Обов'язкове | Опис          |
| -------- | ------ | :---------: | ------------- |
| id       | number |     так     | ID            |
| userId   | string |     так     | FK -> User    |
| theme    | string |     так     | light / dark  |
| language | string |     так     | en / de / ... |

### RefreshToken
| Поле      | Тип      | Обов'язкове | Опис           |
| --------- | -------- | :---------: | -------------- |
| id        | string   |     так     | UUID           |
| token     | string   |     так     | refresh token  |
| userId    | string   |     так     | FK -> User     |
| ip        | string   |     ні      | IP             |
| userAgent | string   |     ні      | User agent     |
| createdAt | DateTime |     так     | Дата           |
| expiresAt | DateTime |     так     | Термін         |
| revoked   | boolean  |     так     | Чи відкликаний |


## 📤 User Response DTO

### 🔹 Auth Response
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@email.com",
      "name": "User Name"
    },
    "accessToken": "jwt",
    "refreshToken": "jwt"
  }
}
```

### 🔹 UserPrivate (/current-user)

👉 використовується:
- `/auth/current-user`

| Поле            | Тип          | Опис         |
| --------------- | ------------ | ------------ |
| id              | string       | ID           |
| email           | string       | Email        |
| name            | string       | Ім’я         |
| isEmailVerified | boolean      | Статус       |
| profile         | UserProfile  | Профіль      |
| settings        | UserSettings | Налаштування |

```json
{
  "id": "uuid",
  "email": "user@email.com",
  "name": "User Name",
  "isEmailVerified": true,
  "profile": {
    "bio": "...",
    "avatar": "..."
  },
  "settings": {
    "theme": "dark",
    "language": "en"
  }
}
```

### 🔹UserPublicPage

👉 використовується:
- повертаємо інших користувачів
- `GET /user/profile/:id`

| Поле          | Тип                 | Опис        |
| ------------- | ------------------- | ----------- |
| id            | string              | ID          |
| email         | string              | Email       |
| name          | string              | Ім’я        |
| siteRole      | SiteRole            | Роль        |
| createdAt     | DateTime            | Дата        |
| updatedAt     | DateTime            | Дата        |
| profile       | UserProfile \| null | Профіль     |
| location      | Location \| null    | Локація     |
| organizations | Organization[]      | Організації |
| tasks         | Task[]              | Задачі      |

Response 
```json
{
  "status": "success",
  "code": "USER_PROFILE_RETRIEVED",
  "data": {
    "user": {
      "id": "4e53467",
      "email": "user@email.com",
      "name": "User Example",
      "siteRole": "USER",
      "createdAt": "2026-03-16T20:45:46.422Z",
      "updatedAt": "2026-03-16T20:50:05.121Z",

      "profile": {
        "bio": "...",
        "avatar": "..."
      },

      "location": null,

      "organizations": [...],
      "tasks": [...]
    }
  }
}
```

### 🔹 UserPublic

👉 використовується коли:
- список учасників
- joinedUsers
- host.user

UserPublic DTO
| Поле      | Тип      | Опис                     |
| --------- | -------- | ------------------------ |
| id        | string   | ID користувача           |
| name      | string   | Ім’я                     |
| avatar    | string   | URL аватарки (з profile) |
| createdAt | DateTime | Дата створення           |

Приклад
```json
{
  "id": "decdbe5a-914dd",
  "name": "User Name",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2026-03-22T23:24:46.777Z"
}
```

⚠️ Важливо

👉 avatar приходить не з User, а з:
```
UserProfile.avatar
```


## ⚠️ Важливі правила
### 🔐 Безпека
- password ніколи не повертається
- resetPasswordToken ніколи не повертається
- refreshToken зберігається в БД

### 🔁 Refresh flow
- access token → короткий
- refresh token → довгий
- при logout → refresh токен revoke

### 🔥 Валідація
- email → валідний формат
- password → мінімум 6 символів
- name → 3–30 символів

## Архітектурний момент

👉 User розділений на:

| DTO            | Де використовується |
| -------------- | ------------------- |
| UserPrivate    | current user        |
| UserPublicPage | profile page        |
| UserPublic     | списки              |


## Пов’язані сутності

UserProfile  
UserSettings  
RefreshToken  
Location  
Organization  