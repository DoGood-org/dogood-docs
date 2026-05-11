# ⚙️ UserSettings

## Опис

Сутність налаштувань користувача.

Зберігає персональні налаштування інтерфейсу:

- тему оформлення
- мову застосунку

Кожен користувач має лише один запис UserSettings.

## 1. UserSettings Request DTO
🔹 UpdateUserSettings

👉 використовується:
  - `PATCH /user/settings`

| Поле     | Тип    | Обов'язкове | Опис                    |
| -------- | ------ | :---------: | ----------------------- |
| theme    | string |     ні      | `light` або `dark`      |
| language | string |     ні      | Код мови (2–5 символів) |


### Валідація
- theme → тільки light або dark
- language → від 2 до 5 символів
  
## 2. UserSettings DB Model

<img src="/diagrams/userSettings.svg" class="diagram" />

📋 Поля
| Поле     | Тип    | Обов'язкове | Опис                    |
| -------- | ------ | :---------: | ----------------------- |
| id       | number |     так     | ID налаштувань          |
| userId   | string |     так     | FK → User.id            |
| theme    | string |     так     | Тема (`light` / `dark`) |
| language | string |     так     | Мова (`en`, `de`)       |



## 3. UserSettings Response DTO
### Response поля

| Поле     | Тип    | Опис           |
| -------- | ------ | -------------- |
| id       | number | ID налаштувань |
| userId   | string | ID користувача |
| theme    | string | Поточна тема   |
| language | string | Поточна мова   |

### Приклад UserSettingsResponse
```json
{
  "status": "success",
  "code": "USER_SETTINGS_UPDATED",
  "data": {
    "settings": {
      "id": 1,
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "theme": "dark",
      "language": "en"
    }
  }
}
```



## Особливості
- settings створюються автоматично при реєстрації
- якщо settings не існують → використовується upsert
- один користувач може мати лише один UserSettings

## 🔗 Пов’язані сутності
- [User](user)