using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Util
{
    public class ComponentFileUtility
    {
        string path { get; set; }
        string fileName { get; set; }
        public ComponentFileUtility(string path, string fileName)
        {
            this.path = path;
            this.fileName = fileName;
        }

        public void setNewPath(string newPath)
        {
            if (path != null)
            {
                path = newPath;
            }
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
            for(int i = 0; i < GetFiles().Length; i++)
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
            for(int i = 0; i < GetFileNames().Length; i++)
            {
                if (className.Equals(GetFileNames()[i]))
                {
                    string contentsOfFile = GetFileContents(GetFiles()[i]);
                    if (contentsOfFile.Contains("extends"))
                    {
                        string[] stringSplit = contentsOfFile.Split("extends");
                        string[] isolationSplit = stringSplit[1].Split(" ");
                        for(int j = 0; j < isolationSplit.Length; j++)
                        {
                            if(!isolationSplit[j].Equals(" ") && !isolationSplit[j].Equals(""))
                            {
                                return isolationSplit[j];
                            }
                        }
                        
                    }
                }
            }
            return null;
        }

        public void addFileObjectToMongoDB()
        {
            //TODO
            //Needs File name, category, 
            //filetype, probably a path for each server to fetch it 
            //and the contents of the class so it can be generated.
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
    }
}
