using KanbanApi.Models;
using MongoDB.Driver;

namespace KanbanApi.Services;

public class BoardService
{
    private readonly IMongoCollection<Board> _boardsCollection;

    public BoardService(IMongoDatabase database)
    {
        _boardsCollection = database.GetCollection<Board>("Boards");
    }

    public async Task<List<Board>> GetAsync() =>
        await _boardsCollection.Find(_ => true).ToListAsync();

    public async Task<Board?> GetByIdAsync(string id) =>
        await _boardsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Board newBoard) =>
        await _boardsCollection.InsertOneAsync(newBoard);

    public async Task UpdateAsync(string id, Board updatedBoard) =>
        await _boardsCollection.ReplaceOneAsync(x => x.Id == id, updatedBoard);

    public async Task RemoveAsync(string id) =>
        await _boardsCollection.DeleteOneAsync(x => x.Id == id);
}