using MasterThesisPlatform.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Controllers
{
    public class TeacherController : Controller
    {
        public IActionResult Index()
        {
            
            return View();
        }

        public IActionResult StudentsPage()
        {
            return View();
        }

        [HttpPost("AddGameAction")]
        public IActionResult AddGameAction()
        {
            Game game = new Game();
            game.GameId = GenerateGameID();
            game.Name = Guid.NewGuid().ToString();
            game.SaveDetails();
            return View("Index");
        }

        public IActionResult CreateGame()
        {
            return View();
        }
        public int GenerateGameID()
        {
            return Guid.NewGuid().GetHashCode();
        }
    }
}
