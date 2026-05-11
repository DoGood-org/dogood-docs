# 👤 UserProfile
## Опис

Профіль користувача.

Містить додаткову інформацію про користувача, яка не належить до auth-сутності User:

- bio
- avatar
- gender
- birthDate
- phoneNumber

UserProfile пов’язаний з User через relation 1:1.

## Представлення сутності

UserProfile використовується:

- у `FullUser`
- у `PublicUser`
- у `/auth/current-user`
- у `/user/profile/public/:id`
- у `/user/profile`

## 1. Update Profile DTO

👉 використовується:

| Поле        | Тип                              | Обов'язкове | Опис            |
| ----------- | -------------------------------- | :---------: | --------------- |
| bio         | string                           |     ні      | Біографія       |
| avatar      | string                           |     ні      | URL аватарки    |
| gender      | [Gender](/constants/user#gender) |     ні      | Стать           |
| birthDate   | Date                             |     ні      | Дата народження |
| phoneNumber | string                           |     ні      | Телефон         |

### Валідація
bio
- максимум 500 символів  
avatar
- має бути валідним URL
- допускається:
    - null
    - порожній рядок ""  
gender
- тільки:
    - MALE
    - FEMALE
    - OTHER  
birthDate
- валідна дата
- дата не може бути в майбутньому  
phoneNumber
- Регулярний вираз:
    ```bash
    ^\+?[0-9]{7,15}$
    ```
    Приклади:
    - +49123456789
    - 380991112233


## 2. UserProfile DB Model
ERD

<img src="/diagrams/userProfile.svg" class="diagram" />

Поля
| Поле        | Тип                              | Обов'язкове | Опис                  |
| ----------- | -------------------------------- | :---------: | --------------------- |
| id          | number                           |     так     | ID профіля            |
| userId      | string                           |     так     | FK → User             |
| bio         | string                           |     ні      | Біографія користувача |
| avatar      | string                           |     ні      | URL аватарки          |
| gender      | [Gender](/constants/user#gender) |     ні      | Стать                 |
| birthDate   | DateTime                         |     ні      | Дата народження       |
| phoneNumber | string                           |     ні      | Номер телефону        |
 

## 3. Response DTO
Приклад
```json
{
  "profile": {
    "id": 1,
    "userId": "uuid",
    "bio": "Frontend developer",
    "avatar": "https://example.com/avatar.jpg",
    "gender": "FEMALE",
    "birthDate": "1998-05-12T00:00:00.000Z",
    "phoneNumber": "+49123456789"
  }
}
```

##  Важливі правила
🔐 Безпека
- UserProfile не містить auth-даних
- password не зберігається в UserProfile

🔁 Relation
- один User → один UserProfile
- UserProfile створюється через:
    - upsert
    - при update профіля

##  Архітектурний момент

UserProfile є optional relation:
```ts
profile: UserProfile | null
```
Тобто:

- користувач може не мати профіля
- profile створюється при першому update

## Пов’язані сутності
- [User](user)