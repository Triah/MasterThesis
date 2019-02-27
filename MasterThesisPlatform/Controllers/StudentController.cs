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
    [Route("Student")]
    public class StudentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

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


        [Route("{gameId}")]
        public IActionResult Game(int gameId)
        {
            foreach(Game g in _context.Games)
            {
                if(g.GameId == gameId)
                {
                    ViewData["GameId"] = g.GameId;
                    ViewData["Name"] = g.Name;
                    return View();
                }
            }
            return RedirectToAction("Index");
        }
        
    }
}
