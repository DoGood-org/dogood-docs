# GET /user/profile/public/:id
## Призначення

Отримання публічного профіля користувача.

## Авторизація

❌ Не потрібна

| Параметр | Тип          | Опис           |
| -------- | ------------ | -------------- |
| id       | string(UUID) | ID користувача |

## Що повертається
- публічна інформація профіля
- organization memberships
- reviews
- tasks

Sensitive fields НЕ повертаються:

- password
- email
- refresh tokens
- settings
- verification fields

## Що робить бекенд
- Валідовує id
- Шукає користувача через findPublicProfileById
- Завантажує:
    - profile
    - location
    - organizations
    - reviewsReceived
    - hosted tasks
    - joined tasks
- Об’єднує tasks через mergeUserTasks
- Видаляє sensitive fields через sanitizeUser
- Повертає PublicUser DTO

## Response
```json
{
  "status": "success",
  "code": "USER_PROFILE_RETRIEVED",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "createdAt": "2026-03-16T20:45:46.422Z",
      "profile": {
        "bio": "",
        "avatar": "https://example.com/avatar.jpg",
        "gender": "MALE"
      },
      "location": {
        "country": "Germany",
        "region": "Bavaria",
        "city": "Munich"
      },
      "organizations": [],
      "reviewsReceived": [],
      "tasks": []
    }
  }
}
```

## ❌ Можливі помилки
| Код              | Опис                    |
| ---------------- | ----------------------- |
| VALIDATION_ERROR | Некоректний user id     |
| USER_NOT_FOUND   | Користувача не знайдено |

## Пов’язані сутності
- User
- Task
- Organization
- Review