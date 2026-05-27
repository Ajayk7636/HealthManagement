using HMS.Core.DTOs;
using HMS.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("summary")]
        public async Task<ActionResult<DashboardSummaryDto>> GetSummary()
        {
            var today = DateTime.UtcNow.Date;

            var summary = new DashboardSummaryDto
            {
                TotalPatients = await _context.Patients.CountAsync(),
                TotalDoctors = await _context.Doctors.CountAsync(),
                TodayAppointments = await _context.Appointments
                    .CountAsync(a => a.AppointmentDate.Date == today),
                PendingAppointments = await _context.Appointments
                    .CountAsync(a => a.Status == "Pending"),
                TotalRevenue = await _context.Bills
                    .Where(b => b.PaymentStatus == "Paid")
                    .SumAsync(b => b.TotalAmount)
            };

            return Ok(summary);
        }

        [HttpGet("revenue-by-month")]
        public async Task<IActionResult> GetRevenueByMonth()
        {
            var revenue = await _context.Bills
                .Where(b => b.PaymentStatus == "Paid")
                .GroupBy(b => new { b.BillDate.Year, b.BillDate.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Amount = g.Sum(b => b.TotalAmount)
                })
                .OrderBy(g => g.Year).ThenBy(g => g.Month)
                .ToListAsync();

            return Ok(revenue);
        }
    }
}
