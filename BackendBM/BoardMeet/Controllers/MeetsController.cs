/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BoardMeet;
using BoardMeet.Models;

namespace BoardMeet.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MeetsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public MeetsController(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
              return Ok(await _context.Meets.ToListAsync());
        }

        // GET: Meets/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Meets == null)
            {
                return NotFound();
            }

            var meet = await _context.Meets
                .FirstOrDefaultAsync(m => m.Id == id);
            if (meet == null)
            {
                return NotFound();
            }

            return Ok(meet);
        }

        [HttpPost("Create")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Name,PeopleCount,DurationMin,DurationMax,Date,Location,Games,Link,Id")] Meet meet)
        {
            if (ModelState.IsValid)
            {
                _context.Add(meet);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(meet);
        }

        // GET: Meets/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Meets == null)
            {
                return NotFound();
            }

            var meet = await _context.Meets.FindAsync(id);
            if (meet == null)
            {
                return NotFound();
            }
            return Ok(meet);
        }

        // POST: Meets/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit/{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Name,PeopleCount,DurationMin,DurationMax,Date,Location,Games,Link,Id")] Meet meet)
        {
            if (id != meet.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.A(meet);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MeetExists(meet.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return Ok(meet);
        }

        // GET: Meets/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Meets == null)
            {
                return NotFound();
            }

            var meet = await _context.Meets
                .FirstOrDefaultAsync(m => m.Id == id);
            if (meet == null)
            {
                return NotFound();
            }

            return Ok(meet);
        }

        // POST: Meets/Delete/5
        [HttpPost("Delete")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Meets == null)
            {
                return Problem("Entity set 'ApplicationContext.Meets'  is null.");
            }
            var meet = await _context.Meets.FindAsync(id);
            if (meet != null)
            {
                _context.Meets.Remove(meet);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MeetExists(int id)
        {
          return _context.Meets.Any(e => e.Id == id);
        }
    }
}
*/