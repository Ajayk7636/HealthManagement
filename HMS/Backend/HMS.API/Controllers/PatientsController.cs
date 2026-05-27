using HMS.Core.DTOs;
using HMS.Core.Entities;
using HMS.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetPatients()
        {
            var patients = await _context.Patients.ToListAsync();
            return patients.Select(p => new PatientDto
            {
                Id = p.Id,
                UserId = p.UserId,
                FullName = p.FullName,
                Age = p.Age,
                Gender = p.Gender,
                BloodGroup = p.BloodGroup,
                ContactNumber = p.ContactNumber,
                EmergencyContact = p.EmergencyContact,
                Address = p.Address,
                MedicalNotes = p.MedicalNotes
            }).ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDto>> GetPatient(int id)
        {
            var p = await _context.Patients.FindAsync(id);
            if (p == null) return NotFound();

            return new PatientDto
            {
                Id = p.Id,
                UserId = p.UserId,
                FullName = p.FullName,
                Age = p.Age,
                Gender = p.Gender,
                BloodGroup = p.BloodGroup,
                ContactNumber = p.ContactNumber,
                EmergencyContact = p.EmergencyContact,
                Address = p.Address,
                MedicalNotes = p.MedicalNotes
            };
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, patient);
        }
    }
}
