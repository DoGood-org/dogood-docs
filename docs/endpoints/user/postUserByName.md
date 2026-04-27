# POST /user/name

## Призначення

Пошук користувачів за ім’ям.

## Авторизація

✅ Потрібна

## Request body
```json
{
  "name": "john"
}
```

## Додаткова логіка
- пошук partial match (частковий збіг)  
    👉 Це означає, що шукається не точне співпадіння, а входження рядка
- case-insensitive (без врахування регістру)
- limit = 10

## Що робить бекенд
1. Валідовує name
2. Виконує пошук
3. Мапить результат → тільки:
    - id
    - name
    - avatar

## Response (з результатами)
```json
{
  "status": "success",
  "code": "USER_DATA_RETRIEVED",
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "id": "string",
        "name": "string",
        "avatar": "string | null"
      }
    ]
  }
}
```

## Response (немає результатів)
```json
{
  "status": "success",
  "code": "USER_DATA_RETRIEVED",
  "message": "No users found with this name",
  "data": {
    "users": []
  }
}
```

❌ Помилки
| Код              | HTTP | Опис             |
| ---------------- | ---- | ---------------- |
| VALIDATION_ERROR | 400  | name не передано |
