namespace TeslaRentingApp
{
    public interface IModelRepository
    {
        Task<List<Model>> GetModels();
        Task<Model> GetModel(int id);
    }
}
