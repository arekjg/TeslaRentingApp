using Microsoft.AspNetCore.Mvc;

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
                var user = await _userRepository.GetUserById(id);
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
                var user = await _userRepository.CreateUnregisteredUser(userDto);
                return ResponseUtility.OkOrBadRequest(user);
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
                var user = await _userRepository.CreateRegisteredUser(userDto);
                return ResponseUtility.OkOrBadRequest(user);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }
    }
}
