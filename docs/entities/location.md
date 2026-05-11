# 📍 Location
## Опис

Сутність локації, яка використовується для:

- користувачів
- організацій

Зберігає базову географічну інформацію:

- країна
- регіон
- місто

`Location` є shared-сутністю:
> одна локація може бути пов’язана з кількома сутностями.

## 1. Location DB Model

<img src="/diagrams/location.svg" class="diagram" />

📋 Поля

| Поле    | Тип    | Обов'язкове | Опис             |
| ------- | ------ | :---------: | ---------------- |
| id      | number |     так     | ID локації       |
| country | string |     ні      | Країна           |
| region  | string |     ні      | Регіон / область |
| city    | string |     ні      | Місто            |

## 2. Location Request DTO
🔹 Update User Profile

👉 використовується:
  - `PATCH /user/profile`

| Поле    | Тип    | Обов'язкове | Опис             |
| ------- | ------ | :---------: | ---------------- |
| country | string |     ні      | Країна           |
| region  | string |     ні      | Регіон / область |
| city    | string |     ні      | Місто            |

###  Валідація
- `country` → мінімум 2 символи
- `region` → мінімум 2 символи
- `city` → мінімум 2 символи

## 3. Location Response DTO
###  Response поля
| Поле    | Тип    | Опис             |
| ------- | ------ | ---------------- |
| id      | number | ID локації       |
| country | string | Країна           |
| region  | string | Регіон / область |
| city    | string | Місто            |

### 🔹 User Location
```json
{
  "id": 1,
  "country": "Germany",
  "region": "Bavaria",
  "city": "Munich"
}
```



##  Особливості
- Location створюється автоматично через upsert
- використовується як shared entity
- orphan locations автоматично видаляються після delete user

## 🔗 Де використовується
👤 User
```
User.locationId -> Location.id
```
🏢 Organization
```
Organization.locationId -> Location.id
```

## 🔗 Пов’язані сутності
- [User](/entities/user)
- Organization
