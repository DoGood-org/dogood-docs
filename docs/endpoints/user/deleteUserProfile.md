# DELETE /user/profile

## Призначення

Видалення користувача та всіх пов’язаних даних.

## Авторизація

✅ Потрібна

## Додаткова логіка
- видаляються ВСІ пов’язані дані:
  - settings
  - refresh tokens
  - reviews
  - chats
  - tasks (як host)
  - relations

## Що робить бекенд
1. Перевіряє авторизацію
2. Виконує транзакцію:
    - видаляє всі залежності
    - видаляє user
    - чистить orphan locations
4. Повертає success

## Response
```json
{
  "status": "success",
  "code": "USER_DELETED"
}

```

## ❌ Помилки
| Код               | HTTP | Опис             |
| ----------------- | ---- | ---------------- |
| AUTH_UNAUTHORIZED | 401  | Не авторизований |
