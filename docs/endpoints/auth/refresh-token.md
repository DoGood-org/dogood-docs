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
- реалізований захист від race condition / replay attack

## Що робить бекенд
1. Отримує refreshToken з cookies
2. Перевіряє JWT (verifyToken)
3. Шукає токен у БД
4. Перевіряє:
   - чи існує
   - чи не прострочений
5. Перевіряє revoked

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

## 🔐 Безпека
- захист від replay attack
- захист від race condition
- перевірка токена в БД
- expiration контроль

## Важливі нюанси
1. Grace period
    > GRACE_PERIOD_MS = 15000

    👉 дозволяє уникнути помилок при паралельних запитах

2. Token reuse detection
    > Token reuse detected! Potential attack.

    👉 якщо токен використаний повторно після revoke

3. TTL refresh
    > addDays(now, 30)

    👉 ~30 днів

## 🔗 Пов’язані сутності

RefreshToken