# POST /organization/create

## Призначення

Створює нову організацію.

Після успішного створення користувач, який виконав запит, автоматично стає її адміністратором (`ADMIN`).

> [!NOTE]
>
> - Endpoint створює не лише запис `Organization`.
> - Одночасно створюються:
>   - `Location` (якщо передано);
>   - `UserOrganization` з роллю `ADMIN` та статусом `ACTIVE`.

---

## Авторизація

✅ Потрібна

Користувач повинен бути авторизований.

---

## Request Body

| Поле             | Тип    | Обов'язкове | Опис                         |
| ---------------- | ------ | :---------: | ---------------------------- |
| name             | string |      ✔      | Назва організації            |
| avatar           | string |             | URL аватара                  |
| description      | string |             | Короткий опис                |
| phoneNumber      | string |             | Контактний телефон           |
| email            | string |             | Email організації            |
| moreInfo         | string |             | Детальна інформація          |
| stripeCustomerId | string |             | Stripe Customer ID           |
| location         | object |             | Місцезнаходження організації |

### location

| Поле    | Тип    | Обов'язкове | Опис   |
| ------- | ------ | :---------: | ------ |
| country | string |             | Країна |
| region  | string |             | Регіон |
| city    | string |             | Місто  |

### Приклад

```json
{
  "name": "Amazon",
  "description": "Amazon Service",
  "phoneNumber": "495277055211099",
  "email": "amazon@example.com",
  "avatar": "https://example.com/logo.png",
  "moreInfo": "Additional information",
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
- назва організації повинна бути унікальною;
- користувач автоматично стає `ADMIN` створеної організації;
- якщо передано `location`, вона створюється разом з організацією;
- новостворене членство отримує статус `ACTIVE`.

---

## Що робить бекенд

1. Перевіряє авторизацію користувача.
2. Перевіряє, що організації з такою назвою ще не існує.
3. Створює запис `Organization`.
4. Створює `Location` (якщо передано).
5. Створює запис `UserOrganization`.
6. Призначає користувачу роль `ADMIN`.
7. Повертає створену організацію.

---

## Response

```json
{
  "status": "success",
  "code": "ORGANIZATION_CREATED",
  "message": "Organization was created successfully",
  "data": {
    "organization": {
            "id": "2cd8c6db-24ca-4bc5-a021-1414155d0a19",
            "name": "Good Organization",
            "createdAt": "2026-07-27T11:54:03.882Z",
            "phoneNumber": "495277055211099",
            "email": "org@example.com",
            "description": "Description of Organization Service",
            "moreInfo": null,
            "avatar": null,
            "locationId": 18,
            "stripeCustomerId": null,
            "location": {
                "id": 18,
                "country": "Germany",
                "region": "Baden-Wurtenberg",
                "city": "Stutgard"
            },
            "members": [
                {
                    "id": "1f589070-327b-45eb-9989-dd5854983825",
                    "userId": "4e53467c-5377-420c-a7f8-5710fefa9896",
                    "organizationId": "2cd8c6db-24ca-4bc5-a021-1414155d0a19",
                    "role": "ADMIN",
                    "status": "ACTIVE",
                    "createdAt": "2026-07-27T11:54:03.882Z"
                }
            ]
        }
  }
}
```

---

## Побічні ефекти

Після успішного виконання:

- створюється запис `Organization`;
- може бути створений запис `Location`;
- створюється запис `UserOrganization`;
- користувач стає адміністратором (`ADMIN`) організації.

---

## ❌ Помилки

| Код                         | HTTP  | Опис                                 |
| --------------------------- | :---: | ------------------------------------ |
| AUTH_UNAUTHORIZED           |  401  | Користувач не авторизований          |
| ORGANIZATION_ALREADY_EXISTS |  409  | Організація з такою назвою вже існує |
| VALIDATION_ERROR            |  400  | Передані некоректні дані             |