# Organization Authorization (RBAC)

## Context

У системі існують організації, в яких один і той самий користувач може мати різні ролі.

Наприклад:

* в Організації A — **ADMIN**
* в Організації B — **MEMBER**
* в Організації C — взагалі не бути учасником.

Отже, роль користувача **не є глобальною**, а визначається **відносно конкретної організації**.

Початково перевірки доступу виконувались напряму:

```ts
role === 'ADMIN'
role === 'MODERATOR'
isAdminOrModerator(role)
```

Такий підхід має декілька недоліків:

* логіка перевірок розкидана по всьому UI;
* при зміні прав необхідно змінювати багато компонентів;
* важко додавати нові ролі;
* компоненти знають забагато про бізнес-логіку.

Було прийнято рішення перейти на Permission-based RBAC.

---

## Decision

Frontend використовує систему **Role → Permission**.

Компоненти більше не перевіряють ролі напряму.

Вони працюють лише з дозволами (permissions).

```
Role
      │
      ▼
ROLE_PERMISSIONS
      │
      ▼
hasPermission()
      │
      ▼
useOrganizationPermissions()
      │
      ▼
React Components
```

---

## Roles

Існує два поняття ролі.

### OrganizationRole

Це ролі, які приходять із Backend.

```ts
type OrganizationRole =
    | 'ADMIN'
    | 'MODERATOR'
    | 'MEMBER';
```

Backend ніколи не повертає інших значень.

Це контракт між Frontend та Backend.

---

### Role

Frontend використовує розширений тип.

```ts
type Role =
    | OrganizationRole
    | 'USER'
    | 'GUEST';
```

#### USER

Авторизований користувач,
який не є учасником організації.

#### GUEST

Неавторизований користувач.

---

## Permissions

Permission описує **що можна зробити**, а не **хто це робить**.

Наприклад:

```ts
enum Permission {
    VIEW_MEMBERS,
    ADD_MEMBER,
    REMOVE_MEMBER,
    ADD_MODERATOR,
    REMOVE_MODERATOR,
    VIEW_REQUESTS,
    APPROVE_REQUEST,
    DELETE_ORG,
    LEAVE_ORGANIZATION,
    JOIN_ORGANIZATION,
}
```

Permission є єдиним способом перевірки доступу.

Компоненти не повинні перевіряти ролі напряму.

---

## ROLE_PERMISSIONS

Файл:

```
rolePermissions.ts
```

Описує,
які permissions належать кожній ролі.

Приклад:

```ts
ADMIN:
[
    ADD_MEMBER,
    REMOVE_MEMBER,
    DELETE_ORG,
    ...
]
```

Саме тут описуються всі бізнес-правила.

При зміні політики доступу змінюється лише цей файл.

Компоненти змінювати не потрібно.

---

## getUserRole()

```ts
getUserRole(members)
```

### Призначення

Визначає роль поточного користувача відносно конкретної організації.

Повертає:

```
ADMIN
MODERATOR
MEMBER
USER
GUEST
```

### Алгоритм

1. Якщо користувач не авторизований

```
GUEST
```

2. Якщо користувач авторизований,
   але відсутній серед members

```
USER
```

3. Якщо знайдений серед members

```
ADMIN
MODERATOR
MEMBER
```

---

## hasPermission()

```ts
hasPermission(role, permission)
```

### Призначення

Перевіряє,
чи має конкретна роль певний дозвіл.

Приклад

```ts
hasPermission(role, Permission.ADD_MEMBER)
```

Повертає

```
true
```

або

```
false
```

Уся логіка знаходиться всередині ROLE_PERMISSIONS.

---

## useOrganizationPermissions()

Це головний хук доступів.

Він приймає **роль**, а не список members.

```
role
      │
      ▼
useOrganizationPermissions()
      │
      ▼
permissions
```

Чому не members?

Тому що хук працює лише з правами.

Йому байдуже,
як була визначена роль.

Роль може бути отримана:

* через getUserRole()
* із Backend
* із JWT
* із Context

Хук не повинен знати джерело ролі.

Це робить його універсальним.

---

### Що повертає useOrganizationPermissions()

```ts
{
    role,

    has,

    isAdmin,
    isModerator,

    canViewMembers,
    canAddMember,
    canRemoveMember,

    canAddModerator,
    canRemoveModerator,

    canViewRequests,
    canApproveRequest,

    canDeleteOrg,

    canLeaveOrg,
    canJoinOrg,
}
```

---

## Чому повертаються готові canXXX

Було розглянуто два варіанти.

### Варіант 1

```ts
const { has } =
    useOrganizationPermissions(role);

const canAdd =
    has(Permission.ADD_MEMBER);
```

### Варіант 2

```ts
const {
    canAddMember
}
=
useOrganizationPermissions(role);
```

Було обрано другий варіант.

Причини:

* простіший JSX;
* не потрібно дублювати виклики has() у десятках компонентів;
* всі назви дозволів знаходяться в одному місці;
* легше читати UI;
* простіше підтримувати.

Для даного проєкту це оптимальний компроміс між універсальністю та простотою.

---

## Приклад використання

Було

```tsx
role === 'ADMIN'
```

або

```tsx
isAdminOrModerator(role)
```

Стало

```tsx
const {
    canAddMember
}
=
useOrganizationPermissions(role);

{
    canAddMember &&
    <AddMember />
}
```

---

## Як додати новий Permission

### 1

Додати значення в enum

```ts
Permission.EXPORT_REPORT
```

---

### 2

Додати його ролям

```
ROLE_PERMISSIONS
```

---

### 3

Додати прапорець

```ts
canExportReport
```

в

```
useOrganizationPermissions()
```

---

### 4

Використати

```tsx
{
    canExportReport &&
    <ExportButton />
}
```

Жодних інших змін не потрібно.

---

## Як додати нову роль

### Backend

Додати роль.

---

### Frontend

Оновити

```
OrganizationRole
```

---

Описати її permissions

```
ROLE_PERMISSIONS
```

---

При необхідності додати нові прапорці в

```
useOrganizationPermissions()
```

Компоненти не змінюються.

---

## Що НЕ рекомендується

❌

```ts
role === 'ADMIN'
```

---

❌

```ts
role === 'MODERATOR'
```

---

❌

```ts
isAdminOrModerator()
```

---

Усі перевірки повинні здійснюватися через permissions.

---

## Схема роботи

```
Backend
        │
        │ members
        ▼
getUserRole()
        │
        ▼
Role
        │
        ▼
ROLE_PERMISSIONS
        │
        ▼
hasPermission()
        │
        ▼
useOrganizationPermissions()
        │
        ▼
React Components
```

---

## Переваги такого підходу

* централізована система доступів;
* компоненти не містять бізнес-логіки;
* просте масштабування;
* зміна прав ролей не потребує зміни UI;
* легке додавання нових permissions;
* легке додавання нових ролей;
* однаковий стиль перевірок у всьому проєкті;
* простіше тестування;
* код компонентів стає значно читабельнішим.

---

## Висновок

У проєкті використовується **Permission-based RBAC**.

Ролі визначаються відносно організації.

Компоненти працюють лише з готовими прапорцями (`canAddMember`, `canDeleteOrg` тощо), а вся логіка доступів централізована в `ROLE_PERMISSIONS` та `useOrganizationPermissions`.

Такий підхід мінімізує дублювання коду, ізолює бізнес-логіку від UI та дозволяє масштабувати систему без масових змін у компонентах.
