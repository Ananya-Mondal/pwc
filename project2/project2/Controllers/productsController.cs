using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using project2.Data;
using project2.Models;

namespace project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class productsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public productsController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/products
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/products/5
        
        [HttpGet("{id}")]
        public async Task<ActionResult<product>> Getproduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Putproduct( int id, [FromForm] product product, IFormFile fl =null)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            if (fl != null)
            {
                if (fl.Length > 0)
                {
                    product.Image_Name = new MyFlieHandler().Upload(fl);
                }
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!productExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPost]
        public async Task<ActionResult<product>> Postproduct([FromForm] product product,IFormFile fl)
        {
            product.Image_Name= new MyFlieHandler().Upload(fl);
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getproduct", new { id = product.Id }, product);
        }


        

        // DELETE: api/products/5
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteproduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool productExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
            


        }

        // GET: api/products
        
        [HttpGet("UserProduct/{Email}")]
        public async Task<ActionResult<IEnumerable<product>>> UserProduct(string Email)
        {
            

            return await _context.Products.FromSqlRaw("SELECT * From Products Where CreatedBy='"+ Email + "'").ToListAsync();


            //return await _context.Products.ToListAsync();
        }

        [HttpGet("OrderView/{id}")]
        public async Task<ActionResult<IEnumerable<OrderView>>> OrderView(int id)
        {
            return await _context.OrderView.FromSqlRaw("SELECT * From Order_Details_View Where Id=" + id).ToListAsync();
        }
    }
}
