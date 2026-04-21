# POST /auth/resend-verification

## Призначення

Повторна відправка email підтвердження.

## Авторизація

❌ Не потрібна

## Request body
```json
{
  "email": "user@email.com"
}
```

## 🔥 Додаткова логіка
- якщо користувача немає → помилка
- якщо вже verified → success без відправки

## Що робить бекенд
1. Шукає користувача
2. Якщо verified → success
3. Генерує новий verificationCode
4. Оновлює expiresAt
5. Відправляє email

## Response
```json
{
  "message": "Verification email resent. Please check your inbox.",
  "code": "EMAIL_RESEND_SUCCESS"
}
```

## ❌ Помилки
| Код            | HTTP | Опис                    |
| -------------- | ---- | ----------------------- |
| USER_NOT_FOUND | 404  | Користувача не знайдено |

