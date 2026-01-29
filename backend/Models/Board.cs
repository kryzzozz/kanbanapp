using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace KanbanApi.Models;

public class Board
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public List<Column> Columns { get; set; } = new();
}