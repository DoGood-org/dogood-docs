# POST /auth/forgot-password

## Призначення

Запит на відновлення пароля.

## Авторизація

❌ Не потрібна

## Request body
```json
{
  "email": "user@email.com"
}
```

## Що робить бекенд
1. Шукає користувача
2. Генерує reset token
3. Відправляє email

## Response
```json
{
  "message": "Reset password email sent, check your inbox",
  "code": "PASSWORD_RESET_EMAIL_SENT"
}
```

## ❌ Помилки
| Код            | HTTP | Опис                    |
| -------------- | ---- | ----------------------- |
| USER_NOT_FOUND | 404  | Користувача не знайдено |
