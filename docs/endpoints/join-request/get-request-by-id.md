# GET /organization/join-request/:id

## Призначення

Повертає один **PENDING JoinRequest** за його ID.

Endpoint використовується для перегляду конкретної заявки перед її обробкою.

> [!NOTE]
>
> - Повертаються лише JoinRequest зі статусом `PENDING`.
> - Якщо JoinRequest уже оброблений (`ACCEPTED`, `REJECTED` або `CANCELLED`), endpoint повертає помилку.
> - Перегляд доступний лише користувачам, які мають право доступу до цього JoinRequest.

---

## Авторизація

✅ Потрібна

Користувач повинен бути авторизований.

---

## Path Parameters

| Параметр | Тип    | Обов'язковий | Опис           |
| -------- | ------ | :----------: | -------------- |
| id       | string |      ✔       | ID JoinRequest |

---

## Business Rules

- користувач повинен бути авторизований;
- JoinRequest повинен існувати;
- JoinRequest повинен мати статус `PENDING`;
- доступ дозволений:
  - користувачу, який створив JoinRequest;
  - `ADMIN` або `MODERATOR` організації-одержувача.

---

## Що робить бекенд

1. Перевіряє авторизацію користувача.
2. Отримує JoinRequest за ID.
3. Перевіряє, що JoinRequest існує.
4. Перевіряє, що статус JoinRequest — `PENDING`.
5. Визначає, чи є поточний користувач:
   - автором JoinRequest;
   - або `ADMIN` / `MODERATOR` організації-одержувача.
6. Якщо перевірка успішна — повертає JoinRequest.

---

## Response

```json
{
  "status": "success",
  "data": {
    "joinRequest": {
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
        "email": "user@mail.com",
        "profile": null
      },
      "senderOrganization": null,
      "receiverOrganization": {
        "id": "314444ad-f624-40cd-b9db-63395219d5e2",
        "name": "Amazon",
        "email": "amazon@example.com",
        "phoneNumber": "495277055211099",
        "description": "Amazon Service"
      }
    }
  }
}
```

---

## Побічні ефекти

Відсутні.

Endpoint лише повертає дані.

---

## ❌ Помилки

| Код                            | HTTP  | Опис                                             |
| ------------------------------ | :---: | ------------------------------------------------ |
| AUTH_UNAUTHORIZED              |  401  | Користувач не авторизований                      |
| JOIN_REQUEST_NOT_FOUND         |  404  | JoinRequest не знайдено                          |
| JOIN_REQUEST_ALREADY_PROCESSED |  400  | JoinRequest уже оброблений                       |
| MEMBBER_DONT_HAVE_PERMISSION   |  403  | Недостатньо прав для перегляду цього JoinRequest |