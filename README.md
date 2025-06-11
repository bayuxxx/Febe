# 🛡️ Auth API Documentation

API ini menyediakan fitur autentikasi seperti registrasi, login, pengambilan data pengguna saat ini, serta validasi dokter (oleh admin).

---

## 📌 Base URL

```
/api/auth
```

---

## 📋 Endpoints

### 🔐 Register

**POST** `/api/auth/register`  
Registrasi pengguna baru.

#### Payload

```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "John Doe",
  "role": "user | doctor | admin",        // opsional, default: "user"
  "supportingUrl": "https://proof.com",   // wajib jika role = "doctor"
  "adminToken": "string"                  // wajib jika role = "admin"
}
```

> **Catatan:**
> - `supportingUrl` wajib untuk role `doctor`.
> - `adminToken` wajib untuk role `admin`.
I
#### Responses

- `201 Created` – Berhasil registrasi
- `400 Bad Request` – Gagal validasi

---

### 🔓 Login

**POST** `/api/auth/login`  
Login untuk pengguna terdaftar dan mendapatkan token JWT.

#### Payload

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Responses

- `200 OK` – Berhasil login, mengembalikan token dan data user
- `401 Unauthorized` – Email atau password salah

---

### 🙋 Get Current User

**GET** `/api/auth/me`  
Mengambil informasi user yang sedang login.

#### Headers

```
Authorization: Bearer <token>
```

#### Responses

- `200 OK` – Data user berhasil didapatkan
- `401 Unauthorized` – Token tidak ada atau tidak valid

---

### 🩺 Change Doctor Status (Hanya Admin)

**PATCH** `/api/auth/doctors/status`  
Mengubah status validasi seorang dokter (hanya dapat dilakukan oleh admin).

#### Headers

```
Authorization: Bearer <admin-token>
```

#### Payload

```json
{
  "doctorId": "string",
  "isValid": true
}
```

#### Responses

- `200 OK` – Status dokter berhasil diubah
- `403 Forbidden` – Akses ditolak, bukan admin
- `400 Bad Request` – Payload tidak valid

---

## 🔐 Autentikasi

Semua endpoint yang dilindungi menggunakan JWT. Sertakan token di header:

```
Authorization: Bearer <jwt-token-anda>
```

---

## 🏷️ Peran Pengguna

- **user** – Pengguna biasa (default)
- **doctor** – Memerlukan `supportingUrl` saat registrasi
- **admin** – Memerlukan `adminToken` saat registrasi dan punya akses ke endpoint admin

---

## 🧪 Validasi

Semua payload divalidasi menggunakan **Joi**. Jika validasi gagal, API akan memberikan pesan kesalahan yang sesuai.

---

## 📦 Versi

- **API Version:** 1.0.0
