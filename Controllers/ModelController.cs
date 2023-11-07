using Microsoft.AspNetCore.Mvc;

namespace TeslaRentingApp
{
    [ApiController]
    [Route("api/models")]
    public class ModelController : ControllerBase
    {
        private readonly IModelRepository _modelRepository;

        public ModelController(IModelRepository modelRepository)
        {
            _modelRepository = modelRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllModels()
        {
            try
            {
                List<Model> models = await _modelRepository.GetModels();
                return Ok(models);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured: {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetModelById(int id)
        {
            try
            {
                Model? model = await _modelRepository.GetModel(id);

                if (model != null)
                {
                    return Ok(model);                
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured: {e.Message}");
            }
        }


    }
}
