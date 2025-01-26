using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using project2.Data;
using project2.Models;

namespace project2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _con;

        public UsersController(ApplicationDBContext context,IConfiguration conf)
        {
            _context = context;
            _con = conf;
        }
        [Authorize]
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Getuser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteuser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Putusers(string id, [FromBody] User user)
        {
            if (id != user.Email)
            {
                return BadRequest();
            }
            

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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







        [AllowAnonymous]
        [HttpPost("SingUp")]
        public  IActionResult SignUp([FromBody] User user)
        {
            IActionResult act =  Unauthorized();
           

            if (!UserExists(user.Email))
            {
                _context.Users.Add(user);
                if (_context.SaveChanges() > 0)
                {
                    act = Ok(user);
                }
            }
           

            

            return act;
        }


        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult Login([FromForm] string Email, [FromForm] string Password)
        {
            IActionResult act = Unauthorized();
                    
            User su= null;

            su = _context.Users.Find(Email);
            

            if (su != null)
            {
                if(su.Email == Email && su.Password==Password )
                {
                    var sttoken = GenerateToken(su);
                    act = Ok(new { token = sttoken,userdesc=su});
                }
            }

            return act;
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_con["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {               
                new Claim(JwtRegisteredClaimNames.Sub,user.Name),
                new Claim(JwtRegisteredClaimNames.Email,user.Email)
            };
            var token = new JwtSecurityToken(_con["Jwt:Issuer"],
                _con["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        private bool UserExists(string Email)
        {
            return _context.Users.Any(e => e.Email == Email);
        }


    }
}
