# PATCH /organization/:id

## Призначення

Оновлює інформацію про організацію.

Редагування доступне лише користувачу, який має роль `ADMIN` у цій організації.

> [!NOTE]
>
> - Endpoint підтримує часткове оновлення (`PATCH`).
> - Передавати потрібно лише поля, які необхідно змінити.
> - Якщо передано `location`, вона буде оновлена або створена автоматично.

---

## Авторизація

✅ Потрібна

Користувач повинен бути авторизований.

---

## Path Parameters

| Параметр | Тип    | Обов'язковий | Опис           |
| -------- | ------ | :----------: | -------------- |
| id       | string |      ✔       | ID організації |

---

## Request Body

Усі поля необов'язкові.

| Поле             | Тип    | Опис                         |
| ---------------- | ------ | ---------------------------- |
| name             | string | Назва організації            |
| avatar           | string | URL аватара                  |
| description      | string | Короткий опис                |
| phoneNumber      | string | Контактний телефон           |
| email            | string | Email організації            |
| moreInfo         | string | Детальна інформація          |
| stripeCustomerId | string | Stripe Customer ID           |
| location         | object | Місцезнаходження організації |

### location

| Поле    | Тип    | Опис   |
| ------- | ------ | ------ |
| country | string | Країна |
| region  | string | Регіон |
| city    | string | Місто  |

### Приклад

```json
{
  "description": "Updated organization description",
  "phoneNumber": "+49 123 456789",
  "location": {
    "country": "Germany",
    "region": "Bavaria",
    "city": "Munich"
  }
}
```

---

## Business Rules

- користувач повинен бути авторизований;
- користувач повинен бути членом організації;
- лише `ADMIN` може редагувати організацію;
- оновлюються лише поля, передані в запиті;
- якщо `location` вже існує — вона оновлюється;
- якщо `location` відсутня — створюється новий запис та прив'язується до організації.

---

## Що робить бекенд

1. Перевіряє авторизацію користувача.
2. Перевіряє членство через `requireMembership()`.
3. Перевіряє роль користувача (`ADMIN`).
4. Оновлює передані поля організації.
5. Виконує `upsert` для `Location`, якщо передано об'єкт `location`.
6. Повертає оновлену організацію.

---

## Response

```json
{
  "status": "success",
  "code": "ORGANIZATION_UPDATED",
  "message": "Organization was updated successfully",
  "data": {
    "organization": {
      "id": "2cd8c6db-24ca-4bc5-a021-1414155d0a19",
      "name": "DoGood Organization",
      "createdAt": "2026-07-27T11:54:03.882Z",
      "phoneNumber": "+49 123 456789",
      "email": "org@example.com",
      "description": "Updated organization description",
      "moreInfo": null,
      "avatar": null,
      "locationId": 18,
      "stripeCustomerId": null,
      "location": {
          "id": 18,
          "country": "Germany",
          "region": "Bavaria",
          "city": "Munich"
      }
    }
  }
}
```

---

## Побічні ефекти

Після успішного виконання:

- оновлюються поля організації;
- якщо передано `location`, оновлюється або створюється запис `Location`.

---

## ❌ Помилки

| Код                                | HTTP  | Опис                                     |
| ---------------------------------- | :---: | ---------------------------------------- |
| AUTH_UNAUTHORIZED                  |  401  | Користувач не авторизований              |
| USER_IS_NOT_MEMBER_OF_ORGANIZATION |  404  | Користувач не є учасником організації    |
| MEMBBER_DONT_HAVE_PERMISSION       |  403  | Лише `ADMIN` може редагувати організацію |
| VALIDATION_ERROR                   |  400  | Передані некоректні дані                 |