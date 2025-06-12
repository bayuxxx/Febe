
# 🛡️ Health Guard

**Health Guard** adalah aplikasi web berbasis Machine Learning untuk mendeteksi dini penyakit berisiko tinggi, memberikan rekomendasi kesehatan, menyimpan riwayat prediksi, dan menyediakan layanan konsultasi langsung dengan dokter.

---

# 🌐 [Demo Website](https://health-guard-one.vercel.app)  


---

## 📷 Demo Tampilan

### 🖥️ Dashboard Utama
![Dashboard](https://raw.githubusercontent.com/bayuxxx/Febe/main/assets/dashboard-full.png)

### 📊 Hasil Prediksi Penyakit
![Hasil Prediksi](https://github.com/bayuxxx/Febe/blob/main/assets/hasil-analisis.png)

### 💬 Chat dengan Dokter
![Chat Dokter](https://github.com/bayuxxx/Febe/blob/main/assets/chat-user.png)

---

## 🚀 Fitur Utama

- 🤖 **Prediksi Penyakit** dengan Machine Learning
- 💡 **Rekomendasi Kesehatan** untuk menurunkan risiko
- 🗂️ **Riwayat Prediksi** tersimpan otomatis
- 💬 **Chat Dokter** untuk konsultasi langsung

---

## 🛠️ Teknologi yang Digunakan

| Kategori    | Teknologi                                      |
|-------------|------------------------------------------------|
| Frontend    | React.js, Tailwind CSS                         |
| Backend     | Hapi.js                                        |
| Database    | Firebase Firestore                             |
| Auth        | JWT                                            |
| Chat        | WebSocket                                      |

---

## 📦 Cara Menjalankan Proyek

### 1. Clone Repositori

```bash
git clone https://github.com/bayuxxx/Febe.git
cd Febe
```

### 2. Instalasi dan Jalankan

#### Frontend:
```bash
cd FE
npm install
npm run dev
```

#### Backend:
```bash
cd BE
npm install
npm run dev
```

---


# Dokumentasi Api Backend (Node Js)

# Auth API Documentation

Sistem autentikasi berbasis JWT untuk pengguna dengan peran `user`, `doctor`, dan `admin`.

## Base URL

```
https://api-capstone-production.up.railway.app
```

## Authentication

- Token JWT diperlukan untuk mengakses endpoint yang dilindungi (`/me` dan `/doctors/status`).
- Token harus dikirim di header:

```
Authorization: Bearer <token>
```

---

## 📌 Endpoints

### 1. Register User

**POST** `/api/auth/register`

Mendaftarkan user baru (user/doctor/admin).

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "user | doctor | admin",
  "supportingUrl": "https://example.com/cv.pdf", // hanya untuk doctor
  "adminToken": "secret_token" // hanya untuk admin
}
```

#### Responses

- **201** Created
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": "userId",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user"
  }
}
```

- **400** Bad Request – doctor tanpa `supportingUrl`
- **403** Forbidden – admin tanpa `adminToken` atau token salah
- **409** Conflict – email sudah terdaftar

---

### 2. Login User

**POST** `/api/auth/login`

Melakukan login untuk mendapatkan JWT token.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Responses

- **200** OK
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "<jwt_token>"
  }
}
```

- **401** Unauthorized – kombinasi email/password salah

---

# Chat API Documentation

## Endpoints

### 1. Get User Chats

**GET** `/api/chats`

Mengambil semua chat milik user yang sedang login.

#### Headers
```
Authorization: Bearer <token>
```

#### Responses

- **200** OK
```json
{
  "status": "success",
  "data": {
    "chats": [
      {
        "id": "chatId",
        "participants": ["userId", "doctorId"],
        "otherParticipant": {
          "id": "doctorId",
          "name": "Dr. Smith",
          "email": "doctor@example.com",
          "role": "doctor"
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "lastMessage": "Hello, doctor!",
        "lastMessageAt": "2024-01-01T00:01:00.000Z"
      }
    ]
  }
}
```

---

### 2. Create Chat with Doctor

**POST** `/api/chats`

Membuat chat baru antara user dan doctor.

#### Headers
```
Authorization: Bearer <token>
```

#### Request Body
```json
{
  "doctorId": "doctorId123"
}
```

#### Responses

- **201** Created – Chat berhasil dibuat
- **200** OK – Chat sudah ada sebelumnya
- **403** Forbidden – hanya user yang bisa membuat chat
- **404** Not Found – doctor tidak ditemukan
- **400** Bad Request – doctor tidak valid

---

### 3. Get Messages in Chat

**GET** `/api/chats/{chatId}/messages`

Mengambil pesan dalam chat tertentu.

#### Headers
```
Authorization: Bearer <token>
```

#### Path Parameters
- `chatId`: ID dari chat

#### Responses

- **200** OK
```json
{
  "status": "success",
  "data": {
    "chatId": "chatId",
    "messages": [
      {
        "id": "messageId1",
        "chatId": "chatId",
        "senderId": "userId",
        "senderName": "User Name",
        "senderRole": "user",
        "message": "Hello!",
        "createdAt": "2024-01-01T00:01:00.000Z"
      }
    ]
  }
}
```

- **403** Forbidden – user bukan peserta chat
- **404** Not Found – chat tidak ditemukan

---

### 4. Send Message to Chat

**POST** `/api/chats/{chatId}/messages`

Mengirim pesan ke chat.

#### Headers
```
Authorization: Bearer <token>
```

#### Path Parameters
- `chatId`: ID dari chat

#### Request Body
```json
{
  "message": "Halo dokter!"
}
```

#### Responses

- **201** Created – pesan berhasil dikirim
- **403** Forbidden – user bukan peserta chat
- **404** Not Found – chat tidak ditemukan

---

## Doctors

### Get All Valid Doctors

- **URL:** `/api/doctors/valid`
- **Method:** `GET`
- **Auth required:** No
- **Description:** Returns a list of doctors with `role === "doctor"` and `isValid === true`.

- **Response Example:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "doctorId",
      "email": "doctor@example.com",
      "fullName": "Dr. Jane Doe",
      "role": "doctor",
      "isValid": true
    }
  ]
}
```