# POST /auth/resent-forgot-password

## Призначення

Повторна відправка email для відновлення пароля.

## Авторизація

❌ Не потрібна

## Request body
```json
{
  "email": "user@email.com"
}
```

## Поля
| Поле  | Тип    | Обов'язкове | Опис           |
| ----- | ------ | :---------: | -------------- |
| email | string |     так     | Валідний email |

## ⚠️ Важливі правила (валідація)
- email → валідний формат

## 🔥 Додаткова логіка
- користувач має існувати
- якщо користувача не існує → повертається помилка
- новий reset token генерується кожного разу
- попередній токен стає неактуальним

## Що робить бекенд
1. Валідовує body
2. Шукає користувача по email
3. Генерує новий resetPasswordToken
4. Встановлює новий resetPasswordExpiresAt
5. Відправляє email з новим токеном

## Що пишеться в БД
- оновлюється в User:
  - resetPasswordToken
  - resetPasswordExpiresAt

## Response
```json
{
  "message": "Reset password email resent, check your inbox",
  "code": "PASSWORD_RESET_EMAIL_SENT"
}
```

## ❌ Можливі помилки
| Код            | HTTP | Опис                    |
| -------------- | ---- | ----------------------- |
| USER_NOT_FOUND | 404  | Користувача не знайдено |

## Пов’язані сутності

User