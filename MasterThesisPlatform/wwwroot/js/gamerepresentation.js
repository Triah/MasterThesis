var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
var canvasObjects = []
var lockedItem = null;
var itemIsLocked = false;

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
 function createObject(object){ 
var catAndName = object.Category.toLowerCase() + object.ComponentName.charAt(0).toLowerCase() + object.ComponentName.substr(1) 

if(catAndName == "abstractcollisionShape.js") { 
object = new abstractcollisionShape(0, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "abstractshape.js") { 
object = new abstractshape(1, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(2, null, null, null, null); //add defaulting variables so it can all be null
 object.setDefaultForUninstantiatedParameters(canvas)
 object.draw(context)
canvasObjects.push(object);}

 }