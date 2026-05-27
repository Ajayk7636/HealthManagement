using System;
using System.Collections.Generic;

namespace HMS.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<User> Users { get; set; } = new List<User>();
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Patient
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public string FullName { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string BloodGroup { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string EmergencyContact { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string MedicalNotes { get; set; } = string.Empty;
    }

    public class Doctor
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public string FullName { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int Experience { get; set; }
        public decimal ConsultationFee { get; set; }
        public string Availability { get; set; } = string.Empty; // JSON string
    }

    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; } = null!;
        public DateTime AppointmentDate { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Confirmed, Completed, Cancelled
        public string Reason { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Prescription
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }
        public Appointment Appointment { get; set; } = null!;
        public string Diagnosis { get; set; } = string.Empty;
        public string Medicines { get; set; } = string.Empty; // JSON or CSV
        public string DosageInstructions { get; set; } = string.Empty;
        public DateTime? FollowUpDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Bill
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }
        public Appointment Appointment { get; set; } = null!;
        public decimal TotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public string PaymentStatus { get; set; } = "Unpaid"; // Paid, Unpaid, Partial
        public string PaymentMethod { get; set; } = string.Empty;
        public DateTime BillDate { get; set; } = DateTime.UtcNow;
    }

    public class MedicalDocument
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;
        public string FileName { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public DateTime UploadDate { get; set; } = DateTime.UtcNow;
    }
}
