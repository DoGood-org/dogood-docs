# PATCH /organization/join-request/status

## Призначення

Оновлює статус існуючого **JoinRequest**.

Залежно від напрямку (`direction`) запиту та нового статусу (`status`) endpoint:

- приймає Join Request;
- відхиляє Join Request;
- скасовує Join Request або запрошення.

> [!NOTE]
>
> - Лише `PENDING` JoinRequest може бути оброблений.
> - Після зміни статусу на `ACCEPTED` автоматично створюється запис `UserOrganization`.
> - Після зміни статусу на `REJECTED` або `CANCELLED` членство не створюється.

---

## Авторизація

✅ Потрібна

Користувач повинен бути авторизований.

---

## Request Body

| Поле   | Тип               | Обов'язкове | Опис           |
| ------ | ----------------- | :---------: | -------------- |
| id     | string            |      ✔      | ID JoinRequest |
| status | JoinRequestStatus |      ✔      | Новий статус   |

### Дозволені значення `status`

- ACCEPTED
- REJECTED
- CANCELLED

> [!WARNING]
>
> Хоча enum містить значення `PENDING`, повторне встановлення цього статусу не має практичного застосування.

### Приклад

```json
{
  "id": "2e0d3131-2ce3-4c50-80b9-c19bfcb20e9f",
  "status": "ACCEPTED"
}
```

---

## Business Rules

### Якщо `direction = FROM_USER`

- `ADMIN` або `MODERATOR` можуть:
  - ACCEPTED
  - REJECTED
- користувач, який створив Join Request, може:
  - CANCELLED

### Якщо `direction = FROM_ORGANIZATION`

- запрошений користувач може:
  - ACCEPTED
  - REJECTED
- `ADMIN` або `MODERATOR` організації можуть:
  - CANCELLED

---

## Що робить бекенд

1. Перевіряє авторизацію користувача.
2. Перевіряє, що JoinRequest існує та має статус `PENDING`.
3. Перевіряє права відповідно до напрямку JoinRequest.
4. Оновлює статус JoinRequest.
5. Якщо статус `ACCEPTED`:
   - створює `UserOrganization`;
   - створює Notification про успішне приєднання.
6. Якщо статус `REJECTED`:
   - створює Notification про відхилення.
7. Якщо статус `CANCELLED`:
   - лише оновлює статус JoinRequest.

---

## Response

```json
{
  "status": "success",
  "code": "JOIN_REQUEST_STATUS_UPDATED",
  "message": "Join request was updated successfully",
  "data": {
    "result": {
      "id": "fe6c146d-87cd-40f6-8d90-af01763d72ec",
      "senderId": "fa499f65-f089-4c90-af1a-16cb2e29e3a1",
      "senderOrganizationId": null,
      "receiverOrganizationId": "6302196e-4506-4fe0-9dce-10a76b5138b2",
      "receiverUserId": null,
      "status": "CANCELLED",
      "direction": "FROM_USER",
      "createdAt": "2026-07-20T17:15:48.688Z",
      "updatedAt": "2026-07-20T17:16:20.540Z"
  }
  }
}
```

---

## Побічні ефекти

### ACCEPTED

- статус JoinRequest змінюється на `ACCEPTED`;
- створюється запис `UserOrganization`;
- користувачу створюється Notification про успішне приєднання.

### REJECTED

- статус JoinRequest змінюється на `REJECTED`;
- користувачу створюється Notification про відхилення.

### CANCELLED

- статус JoinRequest змінюється на `CANCELLED`;
- додаткових дій не виконується.

---

## ❌ Помилки

| Код                          | HTTP  | Опис                                         |
| ---------------------------- | :---: | -------------------------------------------- |
| AUTH_UNAUTHORIZED            |  401  | Користувач не авторизований                  |
| JOIN_REQUEST_NOT_FOUND       |  404  | JoinRequest не знайдено або вже оброблений   |
| MEMBBER_DONT_HAVE_PERMISSION |  403  | Недостатньо прав для виконання цієї операції |