using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Models
{
    public class MongoDBUser
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string UserName { get; set; }
        [BsonElement]
        public string NormalizedUserName { get; set; }
        [BsonElement]
        public string Email { get; set; }
        [BsonElement]
        public string NormalizedEmail { get; set; }
        [BsonElement]
        public string EmailConfirmed { get; set; }
        [BsonElement]
        public string PasswordHash { get; set; }
        [BsonElement]
        public string SecurityStamp { get; set; }
        [BsonElement]
        public string ConcurrencyStamp { get; set; }
        [BsonElement]
        public int PhoneNumber { get; set; }
        [BsonElement]
        public string PhoneNumberConfirmed { get; set; }
        [BsonElement]
        public string TwoFactorEnabled { get; set; }
        [BsonElement]
        public string LockoutEnd { get; set; }
        [BsonElement]
        public string LockoutEnabled { get; set; }
        [BsonElement]
        public string AccessFailedCount { get; set; }
        [BsonElement]
        public string FirstName { get; set; }
        [BsonElement]
        public string LastName { get; set; }
        [BsonElement]
        public string Role { get; set; }
        [BsonElement]
        public int Age { get; set; }
        [BsonElement]
        public int Grade { get; set; }
        [BsonElement]
        public string School { get; set; }
    }
}
