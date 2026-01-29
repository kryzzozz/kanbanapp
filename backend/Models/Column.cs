using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace KanbanApi.Models;

public class Column
{
    [BsonId]
    //[BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Name { get; set; } = string.Empty;

    public List<KanbanTask> Tasks { get; set; } = new();
}