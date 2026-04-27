# PUT /user/settings

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
Поле	Тип	Обов'язкове	Опис
theme	enum	ні	light / dark
language	string	ні	Мова

## Додаткова логіка
- settings → upsert

## Що робить бекенд
1. Перевіряє авторизацію
2. Оновлює або створює settings
3. Завантажує користувача
4. sanitizeUser
5. Повертає

## Response ⚠️
```json
{
  "status": "success",
  "code": "USER_SETTINGS_UPDATED",
  "data": {
    "settings": { ...UserResponseDTO }
  }
}
```

❗ Тут є проблема:

👉 повртається settings, але кладемо туди user

data: { settings: sanitizedUser }

👉 це вводить в оману
