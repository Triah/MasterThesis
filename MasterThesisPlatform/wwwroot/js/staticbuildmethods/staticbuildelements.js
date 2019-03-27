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

//This method is still in progress, its pretty difficult to get right though so might be a while till its done
canvas.addEventListener('click', function (e) {
    for (var i = 0; i < canvasObjects.length; i++) {
        if (canvasObjects[i].getCollisionArea(e)) {
            //get and reset div
            var div = document.getElementById("buildmode-options-elements");
            div.innerHTML = "";

            for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                //Oh boy this is unreadable as fuck
                if (typeof Object.values(canvasObjects[i])[j] === 'object') {
                    objectVariableToAddTo = Object.keys(canvasObjects[i])[j];
                    objectIdToAddTo = Object.values(canvasObjects[i])[0];
                    div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "><strong><u>" + Object.keys(canvasObjects[i])[j] + "</u></strong></p>"
                    for (var k = 0; k < Object.values(canvasObjects[i])[j].length; k++) {
                        div.innerHTML += "<p style=" + '"' + "text-align:center;" + '"' + "id=" + '"' + "objectvalue" + k + '"' + "><p>"
                        for (var n = 0; n < Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k]).length; n++) {
                            document.getElementById("objectvalue" + k).innerHTML +=
                                Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + (k + 1) + ": " +
                                Object.values(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + "<br>";
                            if (k == Object.values(canvasObjects[i])[j].length - 1) {
                                keysForObject[n] = Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n];
                                div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + "> "
                                    + " <form style=" + '"' + "display: inline-block;" + '"' + ">"
                                    + "<input id=" + '"' + Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n] +
                                    (Object.values(canvasObjects[i])[j].length + 1) + '"' +
                                    " style=" + '"' + "text-align:center;" + '"' + " type=" + '"' + "text" + '"' +
                                    " placeholder=" + '"' + Object.keys(Object.values(Object.values(canvasObjects[i])[j])[k])[n] +
                                    (Object.values(canvasObjects[i])[j].length + 1) + " of type: "
                                    + typeof Object.values(Object.values(Object.values(canvasObjects[i])[j])[k])[n] + '"'
                                    + "onchange=" + '"' + "newValuesOfObject[" + n + "]=" + "this.value;" + '"'
                                    + " /> "
                                    + "</form></div>"
                            }
                        }
                    }
                    div.innerHTML += "<div style=" + '"' + "text-align:center; margin-bottom:3px;" + '"' + ">"
                        + "<button onclick=" + '"' + "addToObjectValues(newValuesOfObject)" + '"' + ">"
                        + "Add New Entry </button></div>"

                    //Line separating the values
                    div.innerHTML += "<hr style=" + '"' + "height:1px;border:none;color:#333;background-color:#333;" + '"' + ">";
                } else if (typeof Object.values(canvasObjects[i])[j] === 'boolean') {
                    console.log("bool detected");
                }
            }
        }
    }
}, false)

function addToObjectValues(listOfValues) {
    if (objectVariableToAddTo != null && objectIdToAddTo != null) {
        var newObjectToAdd = {};
        for (var i = 0; i < keysForObject.length; i++) {
            if (Object.is(parseInt(listOfValues[i]), NaN)) {
                newObjectToAdd[keysForObject[i]] = listOfValues[i];
            } else {
                //special case for bounds
                newObjectToAdd[keysForObject[i]] = parseInt(listOfValues[i]);
            }

        }
        //make a special case for bounds which ensures that whenever a new bound is put in it is done to inbetween the nearest points
                //this can be done by using the euclidian distance i guess
        for (var i = 0; i < canvasObjects.length; i++) {
            if (canvasObjects[i].id == objectIdToAddTo) {
                for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                    if (Object.keys(canvasObjects[i])[j] == objectVariableToAddTo) {
                        Object.values(canvasObjects[i])[j][Object.values(canvasObjects[i])[j].length] = newObjectToAdd;
                        console.log(canvasObjects[i]);
                    }
                }
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            canvasObjects[i].draw(context);
        }

        //set object name to null again
        keysForObject = []
        objectVariableToAddTo = null;
        objectIdToAddTo = null;
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