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
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetModelById(int id)
        {
            try
            {
                Model? model = await _modelRepository.GetModel(id);
                return ResponseUtility.OkOrNotFound(model);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }


    }
}
