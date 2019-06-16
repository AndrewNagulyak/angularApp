using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Jinder.API.Data;
using Jinder.API.Dtos;
using Jinder.API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Jinder.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController:Controller
    {
        IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }
        [AllowAnonymous]

        [HttpPost ("register")]
        public async Task<IActionResult> Register (UserDto userdto)
        {
            userdto.Username = userdto.Username.ToLower();
            if(await _repo.UserExist(userdto.Username))
            {
                return BadRequest("Username already exists");
            }
            var userToCreate = new User()
            {
                Username = userdto.Username
            };
            var createdUser  = _repo.Register(userToCreate,userdto.password);
            return StatusCode(201);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDTO userdto)
        {

            userdto.Username = userdto.Username.ToLower();
          var userr = await _repo.Login(userdto.Username,userdto.Password);
          if(userr == null)
          {
            return Unauthorized();

          }
          
          var claims = new []{
              new Claim(ClaimTypes.NameIdentifier,userr.Id.ToString()),
              new Claim(ClaimTypes.Name,userr.Username)
          };

          var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
          var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
          
          var tokenDescriptor = new SecurityTokenDescriptor {
              Subject = new ClaimsIdentity(claims),
              Expires = DateTime.Now.AddDays(1),
              SigningCredentials = creds

          };
          var tokenHandler = new JwtSecurityTokenHandler();
          var token = tokenHandler.CreateToken(tokenDescriptor);
         // return Ok("here");

         return Ok(new { token = tokenHandler.WriteToken(token)});

        }


    }
}