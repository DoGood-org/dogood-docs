# 🔐 Authentication & Session Flow

## 🧩 Загальна концепція

У системі використовується **JWT + cookies-based session**.

Є два типи токенів:

* **Access Token** → для авторизації запитів
* **Refresh Token** → для керування сесією

---

## 🔑 Access Token

* короткий час життя (~15 хв)
* містить:

  * `userId`
  * `siteRole`
* передається автоматично через **httpOnly cookie**
* використовується для доступу до захищених endpoint'ів

👉 використовується middleware:

* `authenticateUser`

---

## 🔄 Refresh Token

* довгий час життя (~30 днів)
* зберігається:

  * в **httpOnly cookie**
  * в **базі даних (таблиця RefreshToken)**
* використовується для:

  * оновлення access token
  * logout (інвалідація сесії)

---

## 🍪 Cookies

Після логіну бекенд встановлює:

| Cookie       | Опис                    |
| ------------ | ----------------------- |
| accessToken  | короткоживучий (~15 хв) |
| refreshToken | довгоживучий (~30 днів) |

### Параметри:

* `httpOnly: true`
* `secure: true` (у production)
* `sameSite: 'lax' | 'none'`

👉 cookies автоматично відправляються браузером у кожному запиті

---

## 🔐 Авторизація vs Сесія

| Механізм     | Використовується для |
| ------------ | -------------------- |
| accessToken  | авторизація запитів  |
| refreshToken | керування сесією     |

---

## 🔁 Flow

### 1. Login

```http
POST /auth/login
```

👉 бекенд:

* генерує accessToken
* генерує refreshToken
* зберігає refreshToken в БД
* встановлює cookies

---

### 2. Використання API

```http
GET /protected-route
```

👉 браузер автоматично додає cookies
👉 middleware перевіряє accessToken

---

### 3. Refresh токена

```http
POST /auth/refresh-token
```

👉 бекенд:

* перевіряє refreshToken
* робить rotation:

  * старий revoke
  * новий create
* оновлює cookies

---

### 4. Logout

```http
POST /auth/logout
```

👉 бекенд:

* видаляє refresh tokens з БД
* очищає cookies

---

## 🔄 Refresh Token Rotation

При кожному refresh:

* старий токен → `revoked = true`
* створюється новий токен
* оновлюються cookies

👉 це захищає від replay атак

---

## ⚠️ Безпека

* accessToken не зберігається в localStorage
* refreshToken:

  * зберігається тільки в httpOnly cookie
  * перевіряється в БД
* використовується:

  * rotation
  * revoke
  * expiration

---

## 🧠 Особливості реалізації

* logout → видаляє **всі refresh tokens користувача**
* refresh → має захист від race condition (grace period)
* expired tokens → періодично очищаються

---

## ❗ Важливо

* токени **ніколи не повертаються в response body**
* вся робота йде через cookies
* frontend не має прямого доступу до токенів
