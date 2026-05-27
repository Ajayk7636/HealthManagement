# Hospital Management System (HMS)

A complete, professional, and well-structured Hospital Management System architecture suitable for a B.Tech final year project submission.

## 🚀 Technologies Used
- **Frontend**: Angular 19+, Bootstrap 5, Chart.js
- **Backend**: ASP.NET Core 10.0 Web API (Clean Architecture)
- **Database**: MySQL
- **Auth**: JWT (JSON Web Tokens) with Role-based Access Control

## 📁 Project Structure

### Backend (`/HMS/Backend`)
- **HMS.Core**: Domain models, DTOs, and interfaces.
- **HMS.Infrastructure**: Data access (EF Core), Repository implementations.
- **HMS.Services**: Business logic.
- **HMS.API**: Controllers, Auth middleware, and configurations.

### Frontend (`/HMS/Frontend`)
- **Core**: Services, guards, and interceptors.
- **Shared**: Reusable components and models.
- **Modules**: Auth, Admin, Doctor, Patient, and Dashboard modules.
- **Layout**: Main sidebar and navbar structure.

## 🛠️ Setup Instructions

### 1. Database Setup
1. Open your MySQL client.
2. Execute the script found in `HMS/Database/schema.sql`.
3. This will create the `HMS_DB` database and seed initial roles and users.

### 2. Backend Setup
1. Navigate to `HMS/Backend`.
2. Update `appsettings.json` with your MySQL connection string.
3. Run `dotnet restore` to install dependencies.
4. Run `dotnet run --project HMS.API` to start the server.

### 3. Frontend Setup
1. Navigate to `HMS/Frontend`.
2. Run `npm install` to install dependencies.
3. Run `npx ng serve` to start the development server.
4. Open `http://localhost:4200` in your browser.

## 🔐 Default Login Credentials
For testing and demo purposes, use the following credentials:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `Admin123` |
| **Doctor** | `johndoe` | `Doctor123` |
| **Patient** | `patient01` | `Patient123` |

## ✨ Key Features
- **Role-based Dashboards**: Custom views for Admin, Doctor, and Patients.
- **User Management**: Admin can manage users and their roles.
- **Appointment Management**: Complete flow for scheduling and updating appointment status.
- **Digital Prescriptions**: Doctors can generate prescriptions linked to appointments.
- **Billing System**: Automatic invoice generation based on consultation fees and tax calculation.
- **Patient Management**: Centralized records for medical history and contact details.
- **Medical Records**: Architecture for document upload and history tracking.
