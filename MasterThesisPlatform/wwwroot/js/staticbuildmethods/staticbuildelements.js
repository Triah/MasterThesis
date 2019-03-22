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