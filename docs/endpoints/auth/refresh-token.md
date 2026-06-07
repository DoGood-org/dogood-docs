# POST /auth/refresh-token

## Призначення

Оновлення access token та refresh token.

## Авторизація

❌ Не потрібна (accessToken)

⚠️ Потрібен refreshToken у cookies (встановлюється після login)

## Request body

❌ Відсутній

## 🍪 Cookies (вхід)
| Cookie       | Обов'язкове | Опис                                   |
| ------------ | ----------- | -------------------------------------- |
| refreshToken | так         | Використовується для оновлення токенів |

## 🔥 Додаткова логіка
- refreshToken перевіряється:
  - валідність (JWT)
  - наявність у БД
  - строк дії
- використовується token rotation
- реалізований захист від race condition / token reuse attack
- перевіряється статус користувача
- якщо термін тимчасового бану закінчився —
  користувач автоматично розбанюється
- забанений користувач не може оновлювати токени
- якщо бан активний:
  - accessToken cookie очищається
  - refreshToken cookie очищається
- при успішному оновленні:
  - старий refresh token позначається як revoked
  - створюється новий refresh token
  - створюється новий access token

## Що робить бекенд
1. Отримує refreshToken з cookies
2. Перевіряє JWT (`verifyToken`)
3. Шукає токен у БД
4. Перевіряє:
   - чи існує
   - чи не прострочений
5. Перевіряє прапорець `revoked`
6. Обробляє race condition для нещодавно відкликаних токенів
7. Завантажує користувача
8. Перевіряє статус користувача
9. Якщо термін тимчасового бану закінчився — автоматично знімає бан
10. Генерує новий refresh token
11. Позначає старий refresh token як revoked
12. Створює новий запис RefreshToken у БД
13. Генерує новий access token
14. Встановлює нові cookies
15. Повертає success response

## 🔁 Особлива логіка (ВАЖЛИВО)
Якщо token вже revoked:

👉 перевіряється grace period (~15 сек)
- якщо в межах → повертає success (race condition)
- якщо ні → помилка (підозра на атаку)

Далі:

6. Генерує новий refresh token
7. Генерує новий access token
8. Робить rotation:
    - старий → revoked
    - новий → запис у БД
9. Встановлює нові cookies

## 🔄 Token Rotation

👉 при кожному refresh:

- старий токен → revoked = true
- новий токен → створюється
- cookies оновлюються

## 🧾 Що пишеться в БД
- старий RefreshToken → revoked = true
- новий RefreshToken → створюється

## Response
```json 
{
  "message": "Tokens refreshed successfully",
  "code": "AUTH_TOKEN_REFRESHED_SUCCESSFULY"
}
```

## 🚫 Активне блокування

Під час оновлення токенів бекенд перевіряє статус користувача.

Якщо користувач має активне блокування:

- accessToken cookie очищається;
- refreshToken cookie очищається;
- нові токени не генеруються.

### Response

HTTP: `403 Forbidden`

```json
{
  "message": "Access denied. Account suspended.",
  "code": "USER_WAS_BANNED",
  "bannedUser": {
    "accountId": "user-id",
    "suspendedOn": "2026-06-01T12:00:00.000Z",
    "suspensionType": "ONE_WEEK",
    "reason": "Access restricted due to a community guidelines violation",
    "banExpiresAt": "2026-06-08T12:00:00.000Z"
  }
}
```

## 🍪 Cookies (вихід)
| Cookie       | Опис             |
| ------------ | ---------------- |
| accessToken  | новий (~15 хв)   |
| refreshToken | новий (~30 днів) |

## ⚠️ Важливо
- токени не повертаються в body
- вся робота через cookies
- старий refresh token більше не валідний

## ❌ Можливі помилки
| Код                        | HTTP | Опис                         |
| -------------------------- | ---- | ---------------------------- |
| AUTH_REFRESH_TOKEN_INVALID | 401  | Токен відсутній / невалідний |
| USER_NOT_FOUND             | 404  | Користувача не знайдено      |
| USER_WAS_BANNED            | 403  | Обліковий запис заблоковано  |

## 🔐 Безпека
- захист від replay attack
- захист від race condition
- перевірка токена в БД
- expiration контроль

## Важливі нюанси
1. Grace period
    > GRACE_PERIOD_MS = 15000

    Якщо refresh token вже був відкликаний (`revoked=true`), але з моменту відкликання пройшло менше 15 секунд, бекенд вважає це наслідком одночасних запитів (race condition) і повертає успішну відповідь без помилки.

    👉 дозволяє уникнути помилок при паралельних запитах

2. Token reuse detection
    > Token reuse detected! Potential attack.

    Якщо відкликаний (`revoked`) refresh token використовується повторно після завершення grace period, запит відхиляється як потенційна спроба повторного використання токена.


    👉 захист від token reuse attack

3. TTL refresh
    > addDays(now, 30)

    Новий refresh token створюється приблизно на 30 днів.

    👉 термін життя refresh token ~30 днів

## 🔗 Пов’язані сутності

- [RefreshToken](/entities/refresh-token)