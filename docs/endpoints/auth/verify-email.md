# GET /auth/verify-email/:verificationCode

## Призначення

Підтвердження email користувача.

## Авторизація

❌ Не потрібна

Path params
| Параметр         | Тип    | Обов'язкове | Опис        |
| ---------------- | ------ | :---------: | ----------- |
| verificationCode | string |     так     | Код з email |

## 🔥 Додаткова логіка
- код має існувати
- код має бути не прострочений
- якщо email вже підтверджений → повертається success

## Що робить бекенд
1. Шукає користувача по verificationCode
2. Перевіряє:
    - чи існує
    - чи не прострочений
3. Якщо вже verified → success
4. Інакше:
    - встановлює isEmailVerified = true
    - очищає code + expiresAt

## Response (success)
```json
{
  "status": "success",
  "code": "EMAIL_VERIFICATION_SUCCESS",
  "message": "Email successfully verified"
}
```

## Response (вже підтверджений)
```json
{
  "status": "success",
  "code": "EMAIL_ALREADY_VERIFIED",
  "message": "Email already verified"
}
```

## ❌ Помилки
| Код                        | HTTP | Опис             |
| -------------------------- | ---- | ---------------- |
| EMAIL_VERIFICATION_INVALID | 400  | Невалідний код   |
| EMAIL_VERIFICATION_EXPIRED | 400  | Код прострочений |

