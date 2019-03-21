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
object = new abstractcollisionShape(0, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "abstractshape.js") { 
object = new abstractshape(1, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(2, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "testsquare.js") { 
object = new testsquare(3, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "testssquare.js") { 
object = new testssquare(4, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(5, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(6, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "testshape.js") { 
object = new testshape(7, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "testscollisionShape.js") { 
object = new testscollisionShape(8, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "dwadwashape.js") { 
object = new dwadwashape(9, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(10, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(11, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(12, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(13, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(14, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(15, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(16, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(17, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(18, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(19, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(20, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(21, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(22, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(23, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(24, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(25, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(26, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(27, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(28, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(29, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(30, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(31, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(32, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(33, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(34, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(35, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(36, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(37, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(38, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(39, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(40, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(41, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(42, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(43, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(44, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(45, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(46, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(47, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(48, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(49, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(50, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(51, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(52, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(53, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(54, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(55, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(56, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(57, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(58, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(59, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(60, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(61, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(62, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(63, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(64, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(65, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(66, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(67, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(68, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(69, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(70, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(71, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(72, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(73, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(74, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(75, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(76, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(77, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(78, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(79, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(80, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(81, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(82, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(83, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(84, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(85, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(86, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(87, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(88, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(89, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(90, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

else if(catAndName == "shapessquare.js") { 
object = new shapessquare(91, [{ x: 100,y: 100 }, {x: 100, y: 150 }, { x: 150,y: 200 }],true, true, true); //add defaulting variables so it can all be null
 object.draw(context)
canvasObjects.push(object);}

 }