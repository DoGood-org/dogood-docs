# GET /organization/:organizationId/join-requests

## Призначення

Повертає список усіх **PENDING Join Requests**, адресованих вказаній організації.

Endpoint використовується сторінкою керування заявками на вступ до організації.

> [!NOTE]
>
> - Повертаються лише JoinRequest зі статусом `PENDING`.
> - Повертаються лише заявки типу `FROM_USER`, де одержувачем є організація.
> - Запрошення (`FROM_ORGANIZATION`) цей endpoint не повертає.

---

## Авторизація

✅ Потрібна

Користувач повинен бути авторизований.

---

## Path Parameters

| Параметр       | Тип    | Обов'язковий | Опис           |
| -------------- | ------ | :----------: | -------------- |
| organizationId | string |      ✔       | ID організації |

---

## Business Rules

- користувач повинен бути авторизований;
- користувач повинен бути членом організації;
- лише `ADMIN` та `MODERATOR` можуть переглядати Join Requests;
- повертаються лише JoinRequest зі статусом `PENDING`;
- заявки сортуються за датою створення (від нових до старих).

---

## Що робить бекенд

1. Перевіряє авторизацію користувача.
2. Перевіряє членство через `requireMembership()`.
3. Перевіряє роль (`ADMIN` або `MODERATOR`).
4. Отримує всі `PENDING` Join Requests для організації.
5. Завантажує інформацію про користувача-відправника.
6. Сортує заявки за `createdAt DESC`.
7. Повертає список Join Requests.

---

## Response

```json
{
  "status": "success",
  "code": "JOIN_REQUESTS_RETRIEVED",
  "message": "Join requests retrieved successfully",
  "data": {
    "joinRequests": [
      {
          "id": "2e0d3131-2ce3-4c50-80b9-c19bfcb20e9f",
          "senderId": "decdbe5a-98e2-443c-8f41-0b9656b314dd",
          "senderOrganizationId": null,
          "receiverOrganizationId": "314444ad-f624-40cd-b9db-63395219d5e2",
          "receiverUserId": null,
          "status": "PENDING",
          "direction": "FROM_USER",
          "createdAt": "2026-07-13T06:50:15.591Z",
          "updatedAt": "2026-07-13T06:50:15.591Z",
          "sender": {
              "id": "decdbe5a-98e2-443c-8f41-0b9656b314dd",
              "name": "User Name",
              "email": "email@mail.com",
              "profile": null
          },
          "senderOrganization": null
      }
    ]
  }
}
```

---

## Побічні ефекти

Відсутні.

Endpoint лише повертає дані.

---

## ❌ Помилки

| Код                          | HTTP  | Опис                                         |
| ---------------------------- | :---: | -------------------------------------------- |
| AUTH_UNAUTHORIZED            |  401  | Користувач не авторизований                  |
| MEMBBER_DONT_HAVE_PERMISSION |  403  | Недостатньо прав для перегляду Join Requests |