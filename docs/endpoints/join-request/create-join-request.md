# POST /organization/join-request

## Призначення

Створює новий **JoinRequest**.

Endpoint підтримує два сценарії:

- користувач надсилає запит на вступ до організації (`FROM_USER`);
- організація надсилає користувачу запрошення (`FROM_ORGANIZATION`).

> [!NOTE]
>
> - Endpoint **не створює** запис `UserOrganization`.
> - JoinRequest завжди створюється зі статусом `PENDING`.
> - Членство буде створене лише після зміни статусу JoinRequest на `ACCEPTED`.

---

## Авторизація

✅ Потрібна

Користувач повинен бути авторизований.

---

## Request Body

| Поле                   | Тип                  | Обов'язкове | Опис                                                                 |
| ---------------------- | -------------------- | :---------: | -------------------------------------------------------------------- |
| receiverOrganizationId | string               |      *      | ID організації-одержувача. Використовується для `FROM_USER`.         |
| receiverUserId         | string               |      *      | ID користувача-одержувача. Використовується для `FROM_ORGANIZATION`. |
| direction              | JoinRequestDirection |      ✔      | Напрямок Join Request                                                |

> [!NOTE]
>
> Для `FROM_USER` необхідно передати `receiverOrganizationId`.
>
> Для `FROM_ORGANIZATION` необхідно передати `receiverUserId`.

### Приклади

#### Запит на вступ до організації

```json
{
  "receiverOrganizationId": "314444ad-f624-40cd-b9db-63395219d5e2",
  "direction": "FROM_USER"
}
```

#### Запрошення користувача до організації

```json
{
  "receiverUserId": "decdbe5a-98e2-443c-8f41-0b9656b314dd",
  "direction": "FROM_ORGANIZATION"
}
```

---

## Business Rules

- користувач повинен бути авторизований;
- `senderId` визначається автоматично з access token;
- одночасно може існувати лише один `PENDING` JoinRequest з однаковими параметрами;
- після створення JoinRequest створюється Notification;
- запис `UserOrganization` не створюється до прийняття JoinRequest.

---

## Що робить бекенд

1. Перевіряє авторизацію користувача.
2. Отримує `senderId` із JWT.
3. Перевіряє, чи не існує аналогічний `PENDING` JoinRequest.
4. Створює JoinRequest.
5. Створює Notification для одержувача.
6. Повертає створений JoinRequest.

---

## Response

```json
{
  "status": "success",
  "code": "JOIN_REQUEST_CREATED",
  "message": "New join request was created",
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
        "name": "Alona Kuz"
      },
      "senderOrganization": null,
      "receiverOrganization": {
        "name": "Amazon"
      },
      "receiverUser": null
    }
  }
}
```

---

## Побічні ефекти

Після успішного виконання:

- створюється запис `JoinRequest`;
- JoinRequest отримує статус `PENDING`;
- створюється Notification для одержувача;
- запис `UserOrganization` **ще не створюється**.

---

## ❌ Помилки

| Код                         | HTTP  | Опис                                       |
| --------------------------- | :---: | ------------------------------------------ |
| AUTH_UNAUTHORIZED           |  401  | Користувач не авторизований                |
| JOIN_REQUEST_ALREADY_EXISTS |  400  | Аналогічний активний JoinRequest уже існує |