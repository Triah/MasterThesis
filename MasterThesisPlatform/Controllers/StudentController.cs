using MasterThesisPlatform.Data;
using MasterThesisPlatform.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Controllers
{
    public class StudentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("")]
        [Route("Index")]
        public IActionResult Index()
        {
            List<Game> games = new List<Game>();
            
            foreach (var g in _context.Games)
            {

                games.Add(g);
            }
            

            return View(games);

            
        }


        [Route("{gameName}")]
        [Route("(Game/{gameName}")]
        public IActionResult Game()
        {
            return View();
        }
        
    }
}
