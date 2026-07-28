# GET /organization/:id

## Призначення

Повертає повну інформацію про організацію за її ID.

Окрім основних даних організації endpoint повертає пов'язані сутності, необхідні для відображення сторінки організації.

> [!NOTE]
>
> Endpoint не потребує авторизації.
>
> Повертається повне представлення `FullOrganization`.

---

## Авторизація

❌ Не потрібна

---

## Path Parameters

| Параметр | Тип    | Обов'язковий | Опис           |
| -------- | ------ | :----------: | -------------- |
| id       | string |      ✔       | ID організації |

---

## Business Rules

- організація повинна існувати;
- повертається повна інформація про організацію;
- разом з організацією завантажуються всі необхідні пов'язані дані.

---

## Що робить бекенд

1. Перевіряє наявність параметра `id`.
2. Шукає організацію за ID.
3. Завантажує пов'язані дані:
   - Location;
   - Members;
   - Host Profile;
   - Tasks;
   - Reviews;
   - Reviews written by organization.
4. Формує відповідь `FullOrganization`.
5. Повертає знайдену організацію.

---

## Response

```json
{
  "status": "success",
  "code": "ORGANIZATION_DATA_RETRIEVED",
  "message": "Organization found",
  "data": {
    "organization": {
      "id": "2cd8c6db-24ca-4bc5-a021-1414155d0a19",
      "name": "DoGood Organization",
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
              "role": "ADMIN",
              "status": "ACTIVE",
              "userId": "4e53467c-5377-420c-a7f8-5710fefa9896",
              "organizationId": "2cd8c6db-24ca-4bc5-a021-1414155d0a19",
              "user": {
                  "id": "4e53467c-5377-420c-a7f8-5710fefa9896",
                  "name": "User Example",
                  "profile": null
              }
          }
      ],
      "reviews": [],
      "reviewsWrittenOrg": [],
      "tasks": []
    }
  }
}
```

### FullOrganization містить

- основні дані Organization;
- Location;
- Members;
- Tasks;
- Reviews;
- ReviewsWrittenOrg;
- hostId.

> Детальний опис структури наведено на сторінці **Organization → Response DTO**.

---

## Побічні ефекти

Відсутні.

Endpoint лише повертає дані.

---

## ❌ Помилки

| Код                     | HTTP  | Опис                       |
| ----------------------- | :---: | -------------------------- |
| ORGANIZATION_ID_INVALID |  400  | Не передано ID організації |
| ORGANIZATION_NOT_FOUND  |  404  | Організацію не знайдено    |