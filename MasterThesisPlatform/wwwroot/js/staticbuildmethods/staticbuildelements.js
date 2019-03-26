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

canvas.addEventListener('click', function (e) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (canvasObjects[i].getCollisionArea(e)) {
            //get and reset div
            var div = document.getElementById("buildmode-options-elements");
            div.innerHTML = "";

            for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                //Oh boy this is unreadable as fuck
                if (typeof Object.values(canvasObjects[i])[j] === 'object') {
                    for (var k = 0; k < Object.values(canvasObjects[i])[j].length; k++) {
                        div.innerHTML += "<p><strong> bound </strong></p>";
                        div.innerHTML += "<p id=" + '"' + "objectvalue" + k + '"' + "><p>"
                        for (var n = 0; n < Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k]).length; n++) {
                            document.getElementById("objectvalue" + k).innerHTML +=
                                Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + ": " +
                                Object.values(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + ", ";
                        }

                    }
                    console.log(Object.values(canvasObjects[i])[j]);
                    //console.log(Object.values(canvasObjects[i])[j])
                } else if (typeof Object.values(canvasObjects[i])[j] === 'boolean') {
                    console.log("bool detected");
                }

            }

            div.innerHTML += "<p>" + canvasObjects[i].object + "</p>";
            div.innerHTML += "<input id=" + '"' + "boundsTextfield" + '"' + " type=" + '"' + "text" + '"' + "><br>";
            div.innerHTML += "<input id=" + '"' + "boundsTextfield" + '"' + " type=" + '"' + "text" + '"' + "><br>";
        }
    }
}, false)

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