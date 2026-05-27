# Hospital Management System - Architecture Documentation

This document outlines the professional architecture for the Hospital Management System (HMS), designed for a B.Tech final year project.

## 1. System Overview
The HMS is a multi-role web application designed to streamline hospital operations, including patient registration, doctor scheduling, appointment management, billing, and reporting.

### User Roles
- **Admin**: Full system access, user management, hospital configuration, and high-level reports.
- **Doctor**: Manage patient consultations, view appointments, and generate prescriptions.
- **Receptionist**: Patient registration, appointment scheduling, and billing management.
- **Patient/General User**: View medical history, book appointments, and download prescriptions/bills.

---

## 2. Backend Architecture (ASP.NET Core Web API)
The backend follows a **Clean Layered Architecture** to ensure separation of concerns, maintainability, and scalability.

### Layers:
- **HMS.API**: The entry point. Contains Controllers, Middlewares (JWT, Error Handling), and Configurations.
- **HMS.Services**: Contains business logic and application services.
- **HMS.Infrastructure**: Data access layer. Contains Entity Framework Core `DbContext`, Migrations, and Repository implementations.
- **HMS.Core**: The heart of the application. Contains Domain Entities, Repository Interfaces, DTOs (Data Transfer Objects), and Enums.

### Key Technologies:
- **Framework**: ASP.NET Core 8.0/9.0
- **ORM**: Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens) with Role-based Authorization
- **Documentation**: Swagger/OpenAPI

---

## 3. Frontend Architecture (Angular)
The frontend is built with Angular using a **Module-based Structure** for efficient lazy loading and organized code.

### Modules:
- **Core Module**: Singleton services (Auth, API), guards, and interceptors.
- **Shared Module**: Reusable components (Buttons, Modals, Loaders), directives, and pipes.
- **Auth Module**: Login and password recovery components.
- **Admin Module**: User management and system settings.
- **Doctor Module**: Consultation and prescription management.
- **Patient Module**: Profile and medical history.
- **Layout Module**: Main sidebar, navbar, and dashboard structure.

### UI/UX:
- **Framework**: Bootstrap 5 for responsive design.
- **Icons**: Bootstrap Icons.
- **Charts**: Chart.js for dashboard analytics.

---

## 4. Database Design (MySQL)
The database is normalized to ensure data integrity and efficient querying.

### Key Tables:
- **Users**: Id, Username, Email, PasswordHash, RoleId, IsActive.
- **Roles**: Id, Name (Admin, Doctor, etc.).
- **Patients**: Id, UserId, Name, Age, Gender, BloodGroup, Contact, Address.
- **Doctors**: Id, UserId, Specialization, Department, ConsultationFee, Experience.
- **Appointments**: Id, PatientId, DoctorId, AppointmentDate, Status (Pending, Completed, Cancelled).
- **Prescriptions**: Id, AppointmentId, Diagnosis, Medicines, Dosage, Notes.
- **Bills**: Id, AppointmentId, TotalAmount, PaymentStatus, Date.
- **MedicalDocuments**: Id, PatientId, FileName, FilePath, UploadDate.

---

## 5. Project Flow
1. **Authentication**: User logs in -> Server validates credentials -> Server returns JWT token -> Frontend stores token in LocalStorage/SessionStorage.
2. **Authorization**: Frontend Route Guards check role in JWT -> Backend `[Authorize(Roles="Admin")]` attributes protect endpoints.
3. **Dashboard**: Upon login, users are redirected to a role-specific dashboard with relevant summary cards and charts.
4. **User Management**: Admin creates a new user -> System creates record in `Users` table and linked `Patient` or `Doctor` table based on role.
5. **Workflow**:
   - Receptionist registers Patient and schedules Appointment.
   - Doctor views Appointment, conducts consultation, and saves Prescription.
   - System generates a Bill based on consultation fees and prescribed medicines.
   - Patient views their history and downloads the generated PDF documents.

---

## 6. Development & Deployment
- **Backend**: VS Code / Visual Studio
- **Frontend**: VS Code
- **Database**: MySQL Server
- **Version Control**: Git
