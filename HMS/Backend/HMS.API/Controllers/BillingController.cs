using HMS.Core.Entities;
using HMS.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HMS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BillingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBills()
        {
            return await _context.Bills
                .Include(b => b.Appointment)
                .ThenInclude(a => a.Patient)
                .ToListAsync();
        }

        [HttpPost("generate/{appointmentId}")]
        [Authorize(Roles = "Admin,Receptionist")]
        public async Task<ActionResult<Bill>> GenerateBill(int appointmentId)
        {
            var appointment = await _context.Appointments
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.Id == appointmentId);

            if (appointment == null) return NotFound("Appointment not found");

            var bill = new Bill
            {
                AppointmentId = appointmentId,
                TotalAmount = appointment.Doctor.ConsultationFee,
                TaxAmount = appointment.Doctor.ConsultationFee * 0.10m, // 10% tax example
                PaymentStatus = "Unpaid"
            };

            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            return Ok(bill);
        }
    }
}
