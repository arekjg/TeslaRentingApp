using Microsoft.EntityFrameworkCore;

namespace TeslaRentingApp
{
    public class ModelRepository : IModelRepository
    {
        private readonly DataContext _context;

        public ModelRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Model?> GetModel(int id)
        {
            return await _context.Models.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<Model>> GetModels()
        {
            return await _context.Models.ToListAsync();
        }
    }
}
