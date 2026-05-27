-- Hospital Management System Database Schema
-- Database: HMS_DB

CREATE DATABASE IF NOT EXISTS HMS_DB;
USE HMS_DB;

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS Roles (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS Users (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(100) NOT NULL UNIQUE,
    Email VARCHAR(150) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    RoleId INT NOT NULL,
    IsActive BOOLEAN DEFAULT TRUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id)
);

-- 3. Patients Table
CREATE TABLE IF NOT EXISTS Patients (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    FullName VARCHAR(200) NOT NULL,
    Age INT,
    Gender ENUM('Male', 'Female', 'Other'),
    BloodGroup VARCHAR(5),
    ContactNumber VARCHAR(20),
    EmergencyContact VARCHAR(20),
    Address TEXT,
    MedicalNotes TEXT,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- 4. Doctors Table
CREATE TABLE IF NOT EXISTS Doctors (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT NOT NULL,
    FullName VARCHAR(200) NOT NULL,
    Specialization VARCHAR(100),
    Department VARCHAR(100),
    Experience INT, -- In years
    ConsultationFee DECIMAL(10, 2),
    Availability JSON, -- Weekly availability
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- 5. Appointments Table
CREATE TABLE IF NOT EXISTS Appointments (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    PatientId INT NOT NULL,
    DoctorId INT NOT NULL,
    AppointmentDate DATETIME NOT NULL,
    Status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Pending',
    Reason TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PatientId) REFERENCES Patients(Id),
    FOREIGN KEY (DoctorId) REFERENCES Doctors(Id)
);

-- 6. Prescriptions Table
CREATE TABLE IF NOT EXISTS Prescriptions (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    AppointmentId INT NOT NULL,
    Diagnosis TEXT,
    Medicines TEXT, -- Could be JSON or specialized table
    DosageInstructions TEXT,
    FollowUpDate DATE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (AppointmentId) REFERENCES Appointments(Id)
);

-- 7. Bills Table
CREATE TABLE IF NOT EXISTS Bills (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    AppointmentId INT NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    TaxAmount DECIMAL(10, 2) DEFAULT 0.00,
    DiscountAmount DECIMAL(10, 2) DEFAULT 0.00,
    PaymentStatus ENUM('Paid', 'Unpaid', 'Partial') DEFAULT 'Unpaid',
    PaymentMethod VARCHAR(50),
    BillDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (AppointmentId) REFERENCES Appointments(Id)
);

-- 8. MedicalDocuments Table
CREATE TABLE IF NOT EXISTS MedicalDocuments (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    PatientId INT NOT NULL,
    FileName VARCHAR(255) NOT NULL,
    FileType VARCHAR(50),
    FilePath VARCHAR(500) NOT NULL,
    UploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PatientId) REFERENCES Patients(Id)
);

-- SEED DATA
INSERT INTO Roles (Name) VALUES ('Admin'), ('Doctor'), ('Receptionist'), ('Patient');

-- Default Users (Passwords are hashed as 'Admin123', 'Doctor123', 'Patient123' in real app, here placeholders)
-- Default Users (Note: In a real app, these would be securely hashed)
-- Admin (Password: Admin123)
INSERT INTO Users (Username, Email, PasswordHash, RoleId) VALUES ('admin', 'admin@hms.com', 'Admin123', 1);
-- Doctor (Password: Doctor123)
INSERT INTO Users (Username, Email, PasswordHash, RoleId) VALUES ('johndoe', 'dr.john@hms.com', 'Doctor123', 2);
INSERT INTO Doctors (UserId, FullName, Specialization, Department, Experience, ConsultationFee)
VALUES (2, 'Dr. John Doe', 'Cardiology', 'Heart Center', 10, 500.00);

-- Patient (Password: Patient123)
INSERT INTO Users (Username, Email, PasswordHash, RoleId) VALUES ('patient01', 'patient01@gmail.com', 'Patient123', 4);
INSERT INTO Patients (UserId, FullName, Age, Gender, BloodGroup, ContactNumber)
VALUES (3, 'Mr. Patient Zero', 30, 'Male', 'O+', '1234567890');
