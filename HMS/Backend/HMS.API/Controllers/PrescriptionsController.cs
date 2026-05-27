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
    public class PrescriptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PrescriptionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("appointment/{appointmentId}")]
        public async Task<ActionResult<PrescriptionDto>> GetByAppointment(int appointmentId)
        {
            var p = await _context.Prescriptions
                .FirstOrDefaultAsync(p => p.AppointmentId == appointmentId);

            if (p == null) return NotFound();

            return new PrescriptionDto
            {
                Id = p.Id,
                AppointmentId = p.AppointmentId,
                Diagnosis = p.Diagnosis,
                Medicines = p.Medicines,
                DosageInstructions = p.DosageInstructions,
                FollowUpDate = p.FollowUpDate,
                CreatedAt = p.CreatedAt
            };
        }

        [HttpPost]
        [Authorize(Roles = "Doctor")]
        public async Task<ActionResult<Prescription>> PostPrescription(Prescription prescription)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();

            // Also update appointment status to Completed
            var appointment = await _context.Appointments.FindAsync(prescription.AppointmentId);
            if (appointment != null)
            {
                appointment.Status = "Completed";
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetByAppointment), new { appointmentId = prescription.AppointmentId }, prescription);
        }
    }
}
