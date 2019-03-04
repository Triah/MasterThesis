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



        public void addFileObjectToMongoDB(string stringifiedFile)
        {
            //TODO
            //Needs File name, category, 
            //filetype, probably a path for each server to fetch it 
            //and the contents of the class so it can be generated.
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
