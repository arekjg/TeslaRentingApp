using Microsoft.AspNetCore.Mvc;

namespace TeslaRentingApp
{
    [ApiController]
    [Route("api/sign")]
    public class SigningController : ControllerBase
    {
        private readonly ISigningRepository _signingRepository;
        public SigningController(ISigningRepository signingRepository)
        {
            _signingRepository = signingRepository;
        }

        [HttpPut("in")]
        public async Task<IActionResult> PutSignIn(SignInDto signInUserDto)
        {
            try
            {
                var status = await _signingRepository.GetAuthenticatedUser(signInUserDto);
                return ResponseUtility.OkOrBadRequest(status);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpPut("out")]
        public async Task<IActionResult> PutSignOut(SignOutDto signOutDto)
        {
            try
            {
                var status = await _signingRepository.Logout(signOutDto);
                return ResponseUtility.OkOrBadRequest(status);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }

    }
}
