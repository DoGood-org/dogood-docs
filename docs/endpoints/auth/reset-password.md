# POST /auth/reset-password/:resetPasswordToken

## Призначення

Скидання пароля.

## Path params
| Параметр           | Тип    | Обов'язкове | Опис  |
| ------------------ | ------ | :---------: | ----- |
| resetPasswordToken | string |     так     | Токен |

## Request body
```json
{
  "password": "newpassword123"
}
```

## 🔥 Додаткова логіка
- токен має існувати
- токен має бути не прострочений

## Що робить бекенд
1. Перевіряє token
2. Хешує пароль
3. Оновлює пароль
4. Очищає reset token

## Response
```json
{
  "message": "Password has been reset successfully",
  "code": "PASSWORD_CHANGED"
}
```

## ❌ Помилки
| Код                          | HTTP | Опис             |
| ---------------------------- | ---- | ---------------- |
| PASSWORD_RESET_TOKEN_INVALID | 400  | Невалідний токен |

