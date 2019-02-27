using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Models
{
    public class MongoDBScript
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string ComponentName { get; set; }
        [BsonElement]
        public string ComponentContent { get; set; }
        [BsonElement]
        public string Category { get; set; }
    }
}
