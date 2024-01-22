using Microsoft.AspNetCore.Mvc;

namespace TeslaRentingApp
{
    public class ResponseUtility
    {
        public static IActionResult InternalServerError(Exception e)
        {
            return new ObjectResult($"An error occurred: {e.Message}")
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }

        public static IActionResult OkOrNotFound(object? obj)
        {
            if (obj != null)
            {
                return new OkObjectResult(obj);
            }
            else
            {
                return new NotFoundResult();
            }
        }

        public static IActionResult OkOrBadRequest(object? obj)
        {
            if (obj != null)
            {
                return new OkObjectResult(obj);
            }
            else
            {
                return new BadRequestResult();
            }
        }
    }
}
