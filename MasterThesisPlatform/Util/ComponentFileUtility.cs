﻿using MasterThesisPlatform.Models;
using Microsoft.AspNetCore.Http;
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
                                if (isolationSplit[j].Contains("{"))
                                {
                                    return isolationSplit[j].Replace("{", "");
                                }
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

        public void addFileToMongoFromDeveloper(IFormFile file)
        {
            MongoDBScript script = new MongoDBScript();
            script.Category = this.category;
            script.ComponentContent = File.ReadAllText(this.path + file.FileName);
            script.ComponentName = file.FileName;
            script.ComponentSuperName = GetSuperClass(file.FileName);
            mongoDatabase = GetMongoDatabase();
            mongoDatabase.GetCollection<MongoDBScript>("Scripts").InsertOne(script);
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

        public void ExtendComponentsFileForBuilding()
        {
            string filePath = Directory.GetCurrentDirectory() + @"\wwwroot\js\nomodulecomponentscollection.js";
            if (File.Exists(filePath))
            {
                mongoDatabase = GetMongoDatabase();
                string text = "";
                List<MongoDBScript> scriptList = new List<MongoDBScript>();
                foreach (MongoDBScript script in mongoDatabase.GetCollection<MongoDBScript>("Scripts").Find(FilterDefinition<MongoDBScript>.Empty).ToList())
                {
                    scriptList.Add(script);
                }
                List<string> filesInNoModuleComponents = new List<string>();
                List<MongoDBScript> sortedScripts = new List<MongoDBScript>();

                foreach (MongoDBScript s in scriptList)
                {
                    if (s.ComponentSuperName == null)
                    {
                        sortedScripts.Add(s);
                    }
                }

                foreach (MongoDBScript s in scriptList)
                {
                    if (s.ComponentSuperName != null)
                    {
                        sortedScripts.Add(s);
                    }
                }


                text += "'" + "use strict" + "';";
                foreach (MongoDBScript s in sortedScripts)
                {

                    string completeContentPostStrict = s.ComponentContent.Split(";")[1];
                    string[] completeContent = completeContentPostStrict.Split(" ");
                    string content = s.ComponentContent.Split("default")[1];
                    string componentName = s.ComponentName.Split(".")[0];
                    string nomoduleName = s.Category.ToLower() + Char.ToLowerInvariant(componentName[0]) + componentName.Substring(1);
                    string[] allContentsOfFile = content.Split(" ");
                    string nonmoduleExtension = "";
                    if (!filesInNoModuleComponents.Contains(nomoduleName))
                    {
                        for (int i = 0; i < completeContent.Length; i++)
                        {
                            if (completeContent[i].Contains("import"))
                            {
                                string superCategory = completeContent[i + 3].Split("/")[1];
                                nonmoduleExtension = superCategory.ToLower() + Char.ToLowerInvariant(s.ComponentSuperName[0]) + s.ComponentSuperName.Substring(1);
                            }
                        }

                        for (int i = 0; i < allContentsOfFile.Length; i++)
                        {
                            if (allContentsOfFile[i].Equals("class"))
                            {
                                allContentsOfFile[i + 1] = nomoduleName;
                            }
                            if (allContentsOfFile[i].Equals("extends"))
                            {
                                if (allContentsOfFile[i + 1].Contains("{"))
                                {
                                    allContentsOfFile[i + 1] = nonmoduleExtension + " {";
                                }
                                else
                                {
                                    allContentsOfFile[i + 1] = nonmoduleExtension;
                                }

                            }
                        }

                        for (int i = 0; i < allContentsOfFile.Length; i++)
                        {
                            text += " " + allContentsOfFile[i];
                        }
                        filesInNoModuleComponents.Add(nomoduleName);
                    }

                }

                File.WriteAllText(filePath, text);

            }
            else
            {
                var file = File.Create(filePath);
                file.Close();
                ExtendComponentsFileForBuilding();
            }
        }

        public void createGameRepresentationFile()
        {
            string filePath = Directory.GetCurrentDirectory() + @"\wwwroot\js\gamerepresentation.js";
            if (File.Exists(filePath))
            {
                string staticFilePath = Directory.GetCurrentDirectory() + @"\wwwroot\js\staticbuildmethods\staticbuildelements.js";
                mongoDatabase = GetMongoDatabase();
                string textForDynamicFunction = "";
                List<MongoDBScript> scriptList = new List<MongoDBScript>();
                foreach (MongoDBScript script in mongoDatabase.GetCollection<MongoDBScript>("Scripts").Find(FilterDefinition<MongoDBScript>.Empty).ToList())
                {
                    scriptList.Add(script);
                }
                List<string> namesForMethodComparison = new List<string>();
                foreach (MongoDBScript s in scriptList)
                {
                    namesForMethodComparison.Add(s.Category.ToLower() + Char.ToLowerInvariant(s.ComponentName[0]) + s.ComponentName.Substring(1));
                }
                string staticFileText = File.ReadAllText(staticFilePath);

                textForDynamicFunction = "\n function createObject(object){ \n" +
                    "var catAndName = object.Category.toLowerCase() + object.ComponentName.charAt(0).toLowerCase() + object.ComponentName.substr(1) \n";
                for (int i = 0; i < namesForMethodComparison.Count; i++)
                {
                    if (i == 0)
                    {
                        textForDynamicFunction += "\n" + "if(catAndName == " + '"' + namesForMethodComparison[i] + '"' + ") { \n" +
                            "object = new " + namesForMethodComparison[i].Split(".")[0] + "(";
                        string[] variables = scriptList[i].ComponentContent.Split("constructor(")[1].Split(")")[0].Split(",");
                        for(int j = 0; j < variables.Length; j++)
                        {
                            if (j == 0)
                            {
                                textForDynamicFunction += "canvasObjects.length, ";
                            }
                            else if (j != 0 && j != variables.Length-1)
                            {
                                textForDynamicFunction += "null, ";
                            }
                            else
                            {
                                textForDynamicFunction += "null";
                            }
                        }
                        textForDynamicFunction += ");";
                        textForDynamicFunction += "\n object.setDefaultForUninstantiatedParameters(canvas)";
                        textForDynamicFunction += "\n object.setObjectName(catAndName.split(" + '"' + "." + '"' + ")[0]);";
                        textForDynamicFunction += "\n object.draw(context)\n";
                        textForDynamicFunction += "canvasObjects.push(object); \n";
                        textForDynamicFunction += "object.init(canvasObjects);\n }\n";
                    }
                    else
                    {
                        textForDynamicFunction += "\n" + "else if(catAndName == " + '"' + namesForMethodComparison[i] + '"' + ") { \n" +
                                                        "object = new " + namesForMethodComparison[i].Split(".")[0] + "(";
                        string[] variables = scriptList[i].ComponentContent.Split("constructor(")[1].Split(")")[0].Split(",");
                        for (int j = 0; j < variables.Length; j++)
                        {
                            if (j == 0)
                            {
                                textForDynamicFunction += "canvasObjects.length, ";
                            }
                            else if (j != 0 && j != variables.Length - 1)
                            {
                                textForDynamicFunction += "null, ";
                            }
                            else
                            {
                                textForDynamicFunction += "null";
                            }
                        }
                        textForDynamicFunction += ");";
                        textForDynamicFunction += "\n object.setDefaultForUninstantiatedParameters(canvas)";
                        textForDynamicFunction += "\n object.setObjectName(catAndName.split(" + '"' + "." + '"' + ")[0]);";
                        textForDynamicFunction += "\n object.draw(context)\n";
                        textForDynamicFunction += "canvasObjects.push(object); \n";
                        textForDynamicFunction += "object.init(canvasObjects);\n }\n";
                    }
                }
                textForDynamicFunction += "\n }";

                //Add function for creating existing objects
                textForDynamicFunction += "\n\n";

                textForDynamicFunction += "function createExistingObject(obj){ \n";
                textForDynamicFunction += "var objectName = obj.object;";
                for (int i = 0; i < namesForMethodComparison.Count; i++)
                {
                    if (i == 0)
                    {
                        textForDynamicFunction += "\n" + "if(obj.object == " + '"' + namesForMethodComparison[i].Split(".")[0] + '"' + ") { \n" +
                            "obj = new " + namesForMethodComparison[i].Split(".")[0] + "(";
                        string[] variables = scriptList[i].ComponentContent.Split("constructor(")[1].Split(")")[0].Split(",");
                        for (int j = 0; j < variables.Length; j++)
                        {
                            textForDynamicFunction += "obj." + variables[j] + ",";
                        }
                        textForDynamicFunction += ");";
                       textForDynamicFunction += "\n obj.setDefaultForUninstantiatedParameters(canvas); \n" +
                            "obj.setObjectName(objectName); \n" +
                            "obj.draw(context); \n" +
                            "canvasObjects.push(obj); \n" +
                            "obj.init(canvasObjects); \n } \n";
                    }
                    else
                    {
                        textForDynamicFunction += "\n" + "else if(obj.object == " + '"' + namesForMethodComparison[i].Split(".")[0] + '"' + ") { \n" +
                                                        "obj = new " + namesForMethodComparison[i].Split(".")[0] + "(";
                        string[] variables = scriptList[i].ComponentContent.Split("constructor(")[1].Split(")")[0].Split(",");
                        for (int j = 0; j < variables.Length; j++)
                        {
                            textForDynamicFunction += "obj." + variables[j] + ",";
                        }
                        textForDynamicFunction += ");";
                        textForDynamicFunction += "\n obj.setDefaultForUninstantiatedParameters(canvas); \n" +
                             "obj.setObjectName(objectName); \n" +
                             "obj.draw(context); \n" +
                             "canvasObjects.push(obj); \n" +
                             "obj.init(canvasObjects); \n } \n";
                    }
                }

                textForDynamicFunction += "\n }";

                File.WriteAllText(filePath, staticFileText + textForDynamicFunction);
            }
            else
            {
                var file = File.Create(filePath);
                file.Close();
                createGameRepresentationFile();
            }
        }

    }
}
