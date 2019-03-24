var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
var canvasObjects = []
var lockedItem = null;
var itemIsLocked = false;
var idIndex = 0;

canvas.onmousedown = function (e) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (!itemIsLocked && canvasObjects[i].getCollisionArea(e)) {
            itemIsLocked = true;
            lockedItem = canvasObjects[i];
        }
    }
}

canvas.onmousemove = function (e) {
    if (itemIsLocked && lockedItem != null) {
        if (lockedItem.moveAble) {
            lockedItem.move(canvas, e);
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < canvasObjects.length; i++) {
            canvasObjects[i].draw(context);
        }
    }
}

canvas.onmouseup = function (e) {
    //unlock item
    if (lockedItem != null) {
        itemIsLocked = false;
        lockedItem = null;
    }
}

function getObjects() {
    return canvasObjects;
}
 function createObject(object){ 
var catAndName = object.Category.toLowerCase() + object.ComponentName.charAt(0).toLowerCase() + object.ComponentName.substr(1) 

if(catAndName == "abstractcollisionShape.js") { 
object = new abstractcollisionShape(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "abstractshape.js") { 
object = new abstractshape(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "testssquare.js") { 
object = new testssquare(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "testsquare.js") { 
object = new testsquare(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "testcategorysquare.js") { 
object = new testcategorysquare(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "dwadwasquare.js") { 
object = new dwadwasquare(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "dwadwacollisionShape.js") { 
object = new dwadwacollisionShape(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "testscollisionShape.js") { 
object = new testscollisionShape(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

else if(catAndName == "abstractsquare.js") { 
object = new abstractsquare(idIndex, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.setObjectName(catAndName.split(".")[0]);
 object.draw(context)

 idIndex++; 
canvasObjects.push(object);}

 }