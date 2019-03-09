using MasterThesisPlatform.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Util
{
    public class ComponentFileUtility
    {
        public string path { get; set; }
        public string category { get; set; }

        public ComponentFileUtility(string path)
        {
            this.path = path;
        }

        public void setNewPath(string newPath)
        {
                path = newPath;
        }

        public void setCategoryOfFile(string category)
        {
            this.category = category;
        }


        public string[] GetFiles()
        {
            if (path != null)
            {
                string[] array = Directory.GetFiles(path + "\\");
                return array;
            }
            return null;
        }

        public string[] GetFileNames()
        {
            string[] names = new string[GetFiles().Length];
            for (int i = 0; i < GetFiles().Length; i++)
            {
                string[] splitPath = GetFiles()[i].Split("\\");
                names[i] = splitPath[splitPath.Length - 1];
            }
            return names;
        }

        public string[] GetFileExtension()
        {
            string[] extensions = new string[GetFiles().Length];
            for (int i = 0; i < GetFiles().Length; i++)
            {
                string[] splitPath = GetFiles()[i].Split(".");
                extensions[i] = splitPath[splitPath.Length - 1];
            }
            return extensions;
        }

        public string GetSuperClass(string className)
        {
            for (int i = 0; i < GetFileNames().Length; i++)
            {
                if (className.Equals(GetFileNames()[i]))
                {
                    string contentsOfFile = GetFileContents(GetFiles()[i]);
                    if (contentsOfFile.Contains("extends"))
                    {
                        string[] stringSplit = contentsOfFile.Split("extends");
                        string[] isolationSplit = stringSplit[1].Split(" ");
                        for (int j = 0; j < isolationSplit.Length; j++)
                        {
                            if (!isolationSplit[j].Equals(" ") && !isolationSplit[j].Equals(""))
                            {
                                return isolationSplit[j];
                            }
                        }

                    }
                }
            }
            return null;
        }

        private IMongoDatabase mongoDatabase;

        public IMongoDatabase GetMongoDatabase()
        {
            var mongoClient = new MongoClient("mongodb://localhost:27017");
            return mongoClient.GetDatabase("MasterThesisMongoDb");
        }

        public string GetFileName(string path)
        {
            for (int i = 0; i < GetFiles().Length; i++)
            {
                if (path.Equals(GetFiles()[i]))
                {
                    string[] array = GetFiles()[i].Split("\\");
                    string name = array[array.Length - 1];
                    return name;
                }
            }
            return null;
        }

        public string GetCategory()
        {
            string[] categoryDir = this.path.Split("\\");
            string category = categoryDir[categoryDir.Length - 1];
            return category;
        }

        public void addFileObjectToMongoDB()
        {
            string[] filePaths = new string[GetFiles().Length];
            for (int i = 0; i < GetFiles().Length; i++)
            {
                filePaths[i] = GetFiles()[i];

                MongoDBScript script = new MongoDBScript();
                script.Category = GetCategory();
                script.ComponentName = GetFileName(filePaths[i]);
                script.ComponentSuperName = GetSuperClass(GetFileName(filePaths[i]));
                script.ComponentContent = GetFileContents(filePaths[i]);
                mongoDatabase = GetMongoDatabase();
                mongoDatabase.GetCollection<MongoDBScript>("Scripts").InsertOne(script);
            }



        }

        public string GetFileContents(string filePath)
        {
            string fileContents = File.ReadAllText(filePath);
            return fileContents;
        }

        //I need a method for sending the creation request to node, this will most likely be in the developer part

        public string[] StringifyFile()
        {
            string[] fileContents = new string[GetFiles().Length];
            for (int i = 0; i < this.GetFiles().Length; i++)
            {
                fileContents[i] = File.ReadAllText(GetFiles()[i]);
            }
            return fileContents;
        }

        public void CreateNewGameFile()
        {
            if (File.Exists(StaticConstants.PathOfNodeJSGameFile))
            {
                try
                {
                    if (File.Exists(@"C:\Users\Nicolai\Desktop\GameClient\static\testingReplacement.txt"))
                    {
                        File.Delete(@"C:\Users\Nicolai\Desktop\GameClient\static\testingReplacement.txt");
                    }
                }
                catch (Exception e)
                {

                }
                finally
                {
                    var gameFile = File.Create(@"C:\Users\Nicolai\Desktop\GameClient\static\testingReplacement.txt");
                    gameFile.Close();
                    
                }

            }
        }
    }
}
