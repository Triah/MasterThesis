using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Models
{
    public class MongoDBGameRooms
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string roomname { get; set; }
        [BsonElement]
        public string game { get; set; }
        [BsonElement]
        public int capacity { get; set; }
        [BsonElement]
        public string[] users { get; set; }
    }
}
