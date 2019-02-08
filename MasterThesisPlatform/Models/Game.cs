using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Models
{
    public class Game
    {
        public int GameId { get; set; }
        public string Name { get; set; }

        public int SaveDetails()
        {
            SqlConnection connection = new SqlConnection("Server=(localdb)\\mssqllocaldb;Database=MasterThesisDb;Trusted_Connection=True;MultipleActiveResultSets=true");
            string query = "INSERT INTO Game(GameId, Name) values ('" + GameId + "','" + Name + "')";
            SqlCommand cmd = new SqlCommand(query, connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            return i;
        }


    }
}
