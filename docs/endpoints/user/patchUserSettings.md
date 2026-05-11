# PATCH /user/settings

## Призначення

Оновлення налаштувань користувача.

## Авторизація

✅ Потрібна

## Request body
```json
{
  "theme": "dark",
  "language": "en"
}
```

## Поля
| Поле     | Тип              | Обов'язкове |
| -------- | ---------------- | :---------: |
| theme    | enum(light/dark) |      ❌      |
| language | string           |      ❌      |


## Додаткова логіка
- settings → upsert

## Що робить бекенд
1. Перевіряє авторизацію
2. Оновлює або створює settings
3. Повертає settings DTO

## ⚠️ Валідація
- theme → light або dark
- language → від 2 до 5 символів
 
## Response 
```json
{
  "status": "success",
  "code": "USER_SETTINGS_UPDATED",
  "data": {
    "settings": {
      "id": 1,
      "userId": "uuid",
      "theme": "dark",
      "language": "en"
    }
  }
}
```


