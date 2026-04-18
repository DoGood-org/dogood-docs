# POST /auth/signup

## Призначення

Реєстрація нового користувача.

## Авторизація

❌ Не потрібна

## Request body
```json
{
  "name": "User Example",
  "email": "user@email.com",
  "password": "123456"
}
```

## Поля
| Поле     | Тип    | Обов'язкове | Опис                 |
| -------- | ------ | :---------: | -------------------- |
| name     | string |     так     | Ім’я (3–30 символів) |
| email    | string |     так     | Валідний email       |
| password | string |     так     | Мінімум 6 символів   |

## ⚠️ Важливі правила (валідація)
- `name` → 3–30 символів
- `email` → валідний формат
- `password` → мінімум 6 символів

## 🔥 Додаткова логіка
- email має бути унікальним
- пароль хешується перед збереженням
- створюється emailVerificationCode
- створюється UserSettings (автоматично)

## Що робить бекенд
1. Валідовує body
2. Перевіряє чи email вже існує
3. Хешує пароль
4. Створює User
5. Створює UserSettings
6. Генерує verification code
7. Відправляє email (якщо реалізовано)

## Що пишеться в БД
- [User](/entities/user#user)
- [UserSettings]((/entities/user#usersettings))

## Response
```json
{
  "status": "success",
  "code": "USER_CREATED",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@email.com",
      "name": "User Example"
    }
  }
}
```

## ⚠️ Важливо
- password не повертається
- verification code не повертається
- refresh token не створюється на signup (якщо у вас так)

## Пов’язані сутності

[User](/entities/user)