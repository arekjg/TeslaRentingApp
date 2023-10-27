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

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                List<User> users = await _userRepository.GetUsers();
                return Ok(users);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An error occured: {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                User user = await _userRepository.GetUser(id);

                if (user != null)
                {
                    return Ok(user);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An error occured: {e.Message}");
            }
        }
    }
}
