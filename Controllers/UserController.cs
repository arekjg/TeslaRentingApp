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
                var getUserDto = await _userRepository.GetUserById(id);
                return ResponseUtility.OkOrNotFound(getUserDto);
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
                var getUserDto = await _userRepository.CreateUnregisteredUser(userDto);
                return ResponseUtility.OkOrBadRequest(getUserDto);
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
                var getUserDto = await _userRepository.CreateRegisteredUser(userDto);
                return ResponseUtility.OkOrBadRequest(getUserDto);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutUser(UpdateUserDto updatedUserDto)
        {
            try
            {
                var getUserDto = await _userRepository.UpdateUser(updatedUserDto);
                return ResponseUtility.OkOrBadRequest(getUserDto);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpPut("psw")]
        public async Task<IActionResult> PutPassword(UpdatePasswordDto updatedPasswordDto)
        {
            try
            {
                var getUserDto = await _userRepository.UpdatePassword(updatedPasswordDto);
                return ResponseUtility.OkOrBadRequest(getUserDto);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }
    }
}
