var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
var canvasObjects = []
var lockedItem = null;
var itemIsLocked = false;
var idIndex = 0;
var objectVariableToAddTo = null;
var objectIdToAddTo = null;
var keysForObject = [];

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
                newObjectToAdd[keysForObject[i]] = parseInt(listOfValues[i]);
            }

        }
        for (var i = 0; i < canvasObjects.length; i++) {
            if (canvasObjects[i].id == objectIdToAddTo) {
                for (var j = 0; j < Object.keys(canvasObjects[i]).length; j++) {
                    if (Object.keys(canvasObjects[i])[j] == objectVariableToAddTo) {
                        //special case for bounds as they needed to be more intuitive and the position actually matters alot
                        if (Object.keys(canvasObjects[i])[j] == "bounds") {
                            var currentLowestDist = null;
                            var currentSecondLowestDist = null;
                            var lowestCorner = null;
                            var secondLowestCorner = null;
                            for (var k = 0; k < Object.values(canvasObjects[i])[j].length; k++) {
                                var currentDist = Math.hypot(Object.values(Object.values(canvasObjects[i])[j])[k].x - newObjectToAdd.x, Object.values(Object.values(canvasObjects[i])[j])[k].y - newObjectToAdd.y);
                                if (currentLowestDist != null && currentSecondLowestDist != null) {
                                    if (currentDist < currentSecondLowestDist) {
                                        if (currentDist < currentLowestDist) {
                                            currentSecondLowestDist = currentLowestDist;
                                            secondLowestCorner = lowestCorner;
                                            currentLowestDist = currentDist;
                                            lowestCorner = k;
                                        } else {
                                            currentSecondLowestDist = currentDist;
                                            secondLowestCorner = k;
                                        }
                                    }
                                }
                                if (currentSecondLowestDist == null && currentLowestDist != null) {
                                    currentSecondLowestDist = currentDist;
                                    secondLowestCorner = k;
                                }
                                if (currentLowestDist == null) {
                                    currentLowestDist = currentDist;
                                    lowestCorner = k;
                                }

                            }
                            if (lowestCorner != null && secondLowestCorner != null) {
                                console.log(lowestCorner);
                                console.log(secondLowestCorner);
                                if (lowestCorner == Object.values(canvasObjects[i])[j].length - 1 && secondLowestCorner == 0) {
                                    console.log("not expected")
                                    Object.values(canvasObjects[i])[j].push(newObjectToAdd);
                                } else if (secondLowestCorner == Object.values(canvasObjects[i])[j].length - 1 && lowestCorner == 0) {
                                    console.log("not at all expected");
                                    Object.values(canvasObjects[i])[j].push(newObjectToAdd);
                                } else if (secondLowestCorner > lowestCorner) {
                                    console.log("hest")
                                    Object.values(canvasObjects[i])[j].splice(secondLowestCorner, 0, newObjectToAdd);
                                }
                                else if (lowestCorner < secondLowestCorner) {
                                    console.log("lowest")
                                    Object.values(canvasObjects[i])[j].splice(secondLowestCorner, 0, newObjectToAdd);
                                } else if (lowestCorner > secondLowestCorner) {
                                    Object.values(canvasObjects[i])[j].splice(lowestCorner, 0, newObjectToAdd);
                                }
                                
                            }
                            
                        }

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


function createObject(object) {
    var catAndName = object.Category.toLowerCase() + object.ComponentName.charAt(0).toLowerCase() + object.ComponentName.substr(1)

    if (catAndName == "abstractcollisionShape.js") {
        object = new abstractcollisionShape(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "abstractshape.js") {
        object = new abstractshape(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "shapessquare.js") {
        object = new shapessquare(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "testssquare.js") {
        object = new testssquare(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "testsquare.js") {
        object = new testsquare(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "testcategorysquare.js") {
        object = new testcategorysquare(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "dwadwasquare.js") {
        object = new dwadwasquare(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "dwadwacollisionShape.js") {
        object = new dwadwacollisionShape(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "testscollisionShape.js") {
        object = new testscollisionShape(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "abstractsquare.js") {
        object = new abstractsquare(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "shapescollisionShape.js") {
        object = new shapescollisionShape(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "testcategoryshape.js") {
        object = new testcategoryshape(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

    else if (catAndName == "testcollisionShape.js") {
        object = new testcollisionShape(idIndex, null, null, null, null);
        object.setDefaultForUninstantiatedParameters(canvas)
        object.setObjectName(catAndName.split(".")[0]);
        object.draw(context)

        idIndex++;
        canvasObjects.push(object);
    }

}