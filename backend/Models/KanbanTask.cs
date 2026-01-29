using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace KanbanApi.Models;

public class KanbanTask
{
    [BsonId]
    //[BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;

    public List<Subtask> Subtasks { get; set; } = new();
}