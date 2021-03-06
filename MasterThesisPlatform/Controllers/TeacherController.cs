﻿using MasterThesisPlatform.Data;
using MasterThesisPlatform.Models;
using MasterThesisPlatform.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Controllers
{
    [Route("Teacher")]
    public class TeacherController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _context;
        private IMongoDatabase mongoDatabase;

        public IMongoDatabase GetMongoDatabase()
        {
            var mongoClient = new MongoClient("mongodb://localhost:27017");
            return mongoClient.GetDatabase("MasterThesisMongoDb");
        }


        public TeacherController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Route("Index")]
        [HttpGet]
        public IActionResult Index()
        {
            mongoDatabase = GetMongoDatabase();
            var result = mongoDatabase.GetCollection<MongoDBGame>("Games").Find(FilterDefinition<MongoDBGame>.Empty).ToList();
            return View(result);
        }

        [Route("StudentsPage")]
        public IActionResult StudentsPage()
        {
            List<ApplicationUser> students = new List<ApplicationUser>();
            string nameOfCurrentUser = null;
            if (this._userManager.GetUserAsync(HttpContext.User) != null)
            {
                var currentUser = this._userManager.GetUserAsync(HttpContext.User);
                if (currentUser.Result != null)
                {
                    nameOfCurrentUser = currentUser.Result.FirstName + " " + currentUser.Result.LastName;
                }
            }

            foreach (ApplicationUser user in _context.Users)
            {
                if (user.Role.Equals("Student"))
                {
                    if (user.Teacher != null && nameOfCurrentUser != null)
                    {
                        if (user.Teacher.Equals(nameOfCurrentUser)){
                            students.Add(user);
                        }
                    }
                }
            }
            ViewData["students"] = students;
            return View();
        }

        [Route("CreateMongoDbGameEntry")]
        [HttpGet]
        public IActionResult CreateMongoDbGameEntry()
        {
            ComponentFileUtility fileContents = new ComponentFileUtility(null);
            List<MongoDBGameRooms> array = new List<MongoDBGameRooms>();
            List<MongoDBScript> scriptList = new List<MongoDBScript>();
            mongoDatabase = GetMongoDatabase();
            foreach (MongoDBGameRooms room in mongoDatabase.GetCollection<MongoDBGameRooms>("GameRooms").Find(FilterDefinition<MongoDBGameRooms>.Empty).ToList())
            {
                array.Add(room);
            }
            foreach (MongoDBScript script in mongoDatabase.GetCollection<MongoDBScript>("Scripts").Find(FilterDefinition<MongoDBScript>.Empty).ToList())
            {
                scriptList.Add(script);
            }
            ViewData["ContentsOfFile"] = scriptList;
            ViewData["ListOfGames"] = array;
            return View();
        }

        [Route("CreateMongoDbGameEntry")]
        [HttpPost]
        public IActionResult CreateMongoDbGameEntry(MongoDBGame game)
        {
            //TODO: Set the variables for game by requesting forms from the view and save it in the game object before inserting.
            //Might want to hide the forms away, atleast some of them.
            try
            {
                if (this._userManager.GetUserAsync(HttpContext.User) != null)
                {
                    var user = this._userManager.GetUserAsync(HttpContext.User);
                    if (user.Result != null)
                    {
                        mongoDatabase = GetMongoDatabase();

                        game.Id = MongoDB.Bson.ObjectId.GenerateNewId();
                        game.GameId = Guid.NewGuid().GetHashCode();
                        game.Author = user.Result.FirstName + " " + user.Result.LastName;
                        game.Components = HttpContext.Request.Form["ContentsOfCanvas"].ToString();

                        mongoDatabase.GetCollection<MongoDBGame>("Games").InsertOne(game);

                        Game g = new Game();
                        g.GameId = game.GameId;
                        g.Name = game.Name;
                        g.Author = game.Author;
                        g.Components = game.Components;
                        g.Capacity = game.Capacity;
                        g.SaveDetails();
                    }
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return RedirectToAction("Index");
        }

        [Route("DeleteMongoDbGameEntry")]
        [HttpGet]
        public IActionResult DeleteMongoDbGameEntry(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            //Get the database connection  
            mongoDatabase = GetMongoDatabase();
            //fetch the details from Games and pass into view  
            MongoDBGame game = mongoDatabase.GetCollection<MongoDBGame>("Games").Find<MongoDBGame>(k => k.GameId == id).FirstOrDefault();
            if (game == null)
            {
                return NotFound();
            }
            return View(game);
        }

        [Route("DeleteMongoDbGameEntry")]
        [HttpPost]
        public IActionResult DeleteMongoDbGameEntry(MongoDBGame game)
        {
            try
            {
                //Get the database connection  
                mongoDatabase = GetMongoDatabase();
                //Delete the game record  
                var result = mongoDatabase.GetCollection<MongoDBGame>("Games").DeleteOne<MongoDBGame>(k => k.GameId == game.GameId);
                if (result.IsAcknowledged == false)
                {
                    return BadRequest("Unable to Delete Game " + game.GameId);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return RedirectToAction("Index");
        }

        [Route("EditMongoDbGameEntry")]
        [HttpGet]
        public IActionResult EditMongoDbGameEntry(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            //Get the database connection  
            mongoDatabase = GetMongoDatabase();
            //fetch the details from Games based on id and pass into view  
            var game = mongoDatabase.GetCollection<MongoDBGame>("Games").Find<MongoDBGame>(k => k.GameId == id).FirstOrDefault();
            if (game == null)
            {
                return NotFound();
            }

            List<MongoDBScript> scriptList = new List<MongoDBScript>();

            foreach (MongoDBScript script in mongoDatabase.GetCollection<MongoDBScript>("Scripts").Find(FilterDefinition<MongoDBScript>.Empty).ToList())
            {
                scriptList.Add(script);
            }
            ViewData["ContentsOfFile"] = scriptList;

            ViewData["GameContents"] = game.Components;
            return View(game);
        }

        [Route("EditMongoDbGameEntry")]
        [HttpPost]
        public IActionResult EditMongoDbGameEntry(MongoDBGame game)
        {
            try
            {
                //Get the database connection  
                mongoDatabase = GetMongoDatabase();
                //Build the where condition  
                var filter = Builders<MongoDBGame>.Filter.Eq("GameId", game.GameId);
                //Build the update statement   
                var updatestatement = Builders<MongoDBGame>.Update.Set("GameId", game.GameId);
                updatestatement = updatestatement.Set("Name", game.Name);
                updatestatement = updatestatement.Set("Author", game.Author);
                updatestatement = updatestatement.Set("Components", game.Components);
                updatestatement = updatestatement.Set("Capacity", game.Capacity);
                //fetch the details from CustomerDB based on id and pass into view  
                var result = mongoDatabase.GetCollection<MongoDBGame>("Games").UpdateOne(filter, updatestatement);
                if (result.IsAcknowledged == false)
                {
                    return BadRequest("Unable to update Customer  " + game.GameId);
                }
            }
            catch (Exception ex)
            {
                throw;
            }

            return RedirectToAction("Index");
        }

    }


}

