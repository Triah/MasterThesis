using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MasterThesisPlatform.Util
{
    public class ComponentFileUtility
    {
        public ComponentFileUtility()
        {
            //TODO
        }


        public void addFileObjectToMongoDB(string stringifiedFile)
        {
            //TODO
            //Needs File name, category, 
            //filetype, probably a path for each server to fetch it 
            //and the contents of the class so it can be generated.
        }

        //I need a method for sending the creation request to node, this will most likely be in the developer part

        public string StringifyFile(string fileName) {
            //TODO
            return null;
        }
    }
}
