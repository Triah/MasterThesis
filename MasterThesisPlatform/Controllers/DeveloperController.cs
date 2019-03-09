using MasterThesisPlatform.Models;
using MasterThesisPlatform.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Controllers
{
    [Route("Developer")]
    public class DeveloperController : Controller
    {
        ComponentFileUtility fileUtility = new ComponentFileUtility(Directory.GetCurrentDirectory() + "/wwwroot/js/components/");

        private IMongoDatabase mongoDatabase;

        public IMongoDatabase GetMongoDatabase()
        {
            var mongoClient = new MongoClient("mongodb://localhost:27017");
            return mongoClient.GetDatabase("MasterThesisMongoDb");
        }

        [Route("Index")]
        public IActionResult Index()
        {
            List<MongoDBScript> scriptList = new List<MongoDBScript>();
            mongoDatabase = GetMongoDatabase();

            foreach (MongoDBScript script in mongoDatabase.GetCollection<MongoDBScript>("Scripts").Find(FilterDefinition<MongoDBScript>.Empty).ToList())
            {
                scriptList.Add(script);
            }
            ViewData["filesList"] = scriptList;

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UploadComponentAsync(List<IFormFile> files, string categoryDefinition)
        {
            if (!categoryDefinition.Equals(""))
            {
                fileUtility.setCategoryOfFile(categoryDefinition);
                fileUtility.setNewPath(fileUtility.path + fileUtility.category + "/");
                Directory.CreateDirectory(fileUtility.path);
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        using (var stream = new FileStream(fileUtility.path + file.FileName, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                    }
                    fileUtility.addFileToMongoFromDeveloper(file);
                }
            }
            return RedirectToAction("Index");
        }
    }
}
