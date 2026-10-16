# 🚀 Fullstack Task Management & To-Do Application
[🇺🇸 English](#-english) | [🇹🇷 Türkçe](#-türkçe)

---

## 🇺🇸 English

A professional full-stack task management application built with **Spring Boot** (Backend) and **React** (Frontend), featuring automated background tasks, user authentication, and secure data handling.

### ✨ Features
* **User Management:** Secure user registration (with TC No and password) and authentication.
* **Task Management:** Create tasks with custom expiration times (`dueTime`) and track statuses (`BEKLIYOR`, `TAMAMLANDI`, `BASARISIZ`).
* **Automated Cron Jobs:** Background thread (`@Scheduled`) checking and automatically updating expired tasks every minute.
* **DTO Pattern:** Hiding sensitive information (passwords, TC numbers) from API responses.
* **Global Exception Handling:** Clean and centralized error management using `@RestControllerAdvice`.
* **API Documentation:** Interactive Swagger / OpenAPI documentation UI.


### 🛠️ Tech Stack

#### **Backend**
- **Language & Framework:** Java 17, Spring Boot
- **Database & ORM:** MySQL, Spring Data JPA / Hibernate
- **API Documentation:** Springdoc OpenAPI (Swagger UI)
- **Utilities & Validation:** Lombok, Jakarta Validation (`@Valid`), CORS Configuration

#### **Frontend**
- **Core:** React, Vite
- **HTTP Client:** Axios
- **Styling:** Custom Modular CSS / Flexbox Layout

---

### 🔌 REST API Endpoints

> Interactive documentation available at `http://localhost:8080/swagger-ui/index.html` when the application is running.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/users` | Registers a new user |
| **POST** | `/tasks` | Creates a new task for a user |
| **GET** | `/tasks/user/{userId}` | Fetches all tasks belonging to a specific user |
| **GET** | `/tasks/filter?status={status}` | Filters tasks by status |
| **PATCH** | `/tasks/{id}/complete` | Updates task status to `TAMAMLANDI` |

---

### ⚙️ Getting Started

#### **Prerequisites**
- Java 17+
- Node.js (v18+)
- MySQL Database Server

#### **1. Backend Setup (Spring Boot)**
Navigate to the backend directory and update your MySQL credentials in `src/main/resources/application.properties`:

>spring.datasource.url=jdbc:mysql://localhost:3306/to-do?serverTimezone=UTC

>spring.datasource.username=root

>spring.datasource.password=YOUR_PASSWORD

Then run the application using Maven wrapper:
``*bash
cd backend
./mvnw spring-boot:run

### 📸 App Screenshots

| Login Screen |

<img width="1530" height="733" alt="Ekran görüntüsü 2026-10-16 192004" src="https://github.com/user-attachments/assets/f0652521-7f21-48ee-8bdf-0c35a49b7425" />

| Register Screen |

<img width="1533" height="730" alt="Ekran görüntüsü 2026-10-16 192030" src="https://github.com/user-attachments/assets/b48e95fc-7e77-425e-be40-d1a2a45c27d6" />


| Dashboard (Empty) |

<img width="1532" height="630" alt="arayüz" src="https://github.com/user-attachments/assets/4cd5b00e-47a3-483c-bbea-51550e69a41b" />

| Task Tracking |

<img width="1534" height="724" alt="görev_verdik" src="https://github.com/user-attachments/assets/cb52d02f-680c-47a8-8392-b219c54f5d11" />


---

## 🇹🇷 Türkçe

**Spring Boot** (Backend) ve **React** (Frontend) ile geliştirilmiş, kullanıcı bazlı otomatik zamanlanmış görev yönetim sistemi.

### ✨ Öne Çıkan Özellikler
* **Kullanıcı Yönetimi:** Kullanıcı adı, TC Kimlik No ve şifre ile güvenli kayıt ve giriş yapısı.
* **Görev Takibi:** Bitiş tarihi (`dueTime`) ve durumları (`BEKLIYOR`, `TAMAMLANDI`, `BASARISIZ`) olan görev yönetimi.
* **Arka Plan Saati (Cron Job):** `@Scheduled` notasyonu ile süresi dolmuş görevleri otomatik olarak **`BASARISIZ`** yapan mekanizma.
* **Güvenlik & DTO:** Şifre ve TC No sızıntılarını önleyen güvenli veri transfer katmanı.
* **Merkezi Hata Yönetimi:** `@RestControllerAdvice` ile standart JSON hata formatı.
* **Swagger Dokümantasyonu:** `http://localhost:8080/swagger-ui/index.html` üzerinden interaktif API testi.

### 🛠️ Kullanılan Teknolojiler
* **Backend:** Java 17, Spring Boot, MySQL, Spring Data JPA, Lombok.
* **Frontend:** React (Vite), Axios.

