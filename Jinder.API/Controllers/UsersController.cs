using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Jinder.API.Data;
using Jinder.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UsersController : Controller
    {
        private readonly IdatingRepository _datingRepo;
        private readonly IMapper _mapper;
        public UsersController(IdatingRepository datingRepo, IMapper mapper)
        {
            _mapper = mapper;
            _datingRepo = datingRepo;

        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _datingRepo.GetUsers();
             var userToReturn = _mapper.Map<IEnumerable<UserToListDto>>(users);
            return Ok(userToReturn);

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _datingRepo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }
         [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, userforupdatedto userforupdatedto)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();

            var user = await _datingRepo.GetUser(id);

            _mapper.Map(userforupdatedto,user);

            if(await _datingRepo.SaveAll())
            {

                return NoContent();
            }
            throw new Exception(" Failed update changes");
        }

    }
}