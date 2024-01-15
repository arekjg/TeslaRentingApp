﻿using Microsoft.AspNetCore.Mvc;
using TeslaRentingApp.DTOs;
using TeslaRentingApp.Helpers;

namespace TeslaRentingApp
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                User? user = await _userRepository.GetUser(id);
                return ResponseUtility.OkOrNotFound(user);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpPost("u")]
        public async Task<IActionResult> PostUnregisteredUser(AddUnregisteredUserDto userDto)
        {
            try
            {
                return Ok(await _userRepository.CreateUnregisteredUser(userDto));
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpPost("r")]
        public async Task<IActionResult> PostRegisteredUser(AddRegisteredUserDto userDto)
        {
            try
            {
                return Ok(await _userRepository.CreateRegisteredUser(userDto));
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }
    }
}
