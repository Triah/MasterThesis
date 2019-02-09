using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Models
{
    public class MongoDBGame
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement]
        public int GameId { get; set; }
        [BsonElement]
        public string Name { get; set; }
        [BsonElement]
        public string Author { get; set; }
        [BsonElement]
        public string Components { get; set; }
    }
}
